import BigText from "../../components/bigText";
import ProductCard from "../../components/productCard";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
  StyledTextInput,
  StyledTouchableOpacity,
} from "../../components/styleds/components";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import useHomeContentStore from "../../store/homeContentStore";
import api from "../../utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import IconAnt from "react-native-vector-icons/AntDesign";

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuthStore();
  const { addToCart } = useCartStore();
  const [seeMore, setSeeMore] = useState<any>(null);
  const { homeData, fetchComplements, complements } = useHomeContentStore();
  const [productDetails, setProductDetails] = useState<any>(null);
  const [mainQuantity, setMainQuantity] = useState(0);
  const [complementQuantities, setComplementQuantities] = useState<{
    [key: number]: number;
  }>({});
  const [observation, setObservation] = useState("");
  const router = useRouter();

  // Função para buscar detalhes do produto pelo ID
  const loadProductDetails = () => {
    const allProducts = [
      ...homeData.products.flatMap((category) => category.foods),
    ];
    const product = allProducts.find((item) => item.id === Number(id));
    setProductDetails(product);
  };

  const loadSeeMore = async () => {
    if (homeData) {
      setSeeMore(homeData.bestSellers);
    } else {
      try {
        const response = await api.get("/products/page/1/4", {
          headers: { Authorization: "Bearer " + token },
        });
        setSeeMore(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProductDetails();
    setRefreshing(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      loadProductDetails();
    }
    if (token) {
      loadSeeMore();
    }
    if (complements.length === 0) {
      fetchComplements();
    }
  }, [id, token]);

  const handleComplementQuantity = (
    complementId: number,
    operation: "increase" | "decrease"
  ) => {
    setComplementQuantities((prev) => {
      const currentQty = prev[complementId] || 0;
      const newQty = operation === "increase" ? currentQty + 1 : currentQty - 1;
      return {
        ...prev,
        [complementId]: newQty < 0 ? 0 : newQty,
      };
    });
  };

  return (
    <StyledScrollView
      className="min-h-screen bg-white mb-20 w-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {productDetails ? (
        <StyledView className="w-full px-4 py-4">
          <StyledView className="w-full flex flex-col rounded-3xl border-2 border-[#E8EDF2] p-2">
            <StyledView className="flex flex-row items-center justify-start gap-2">
              <IconAnt
                name="arrowleft"
                size={25}
                color="#A3A3A3"
                onPress={() => router.back()}
              />
            </StyledView>
            <StyledView className="w-full h-fit flex items-center justify-center">
              {productDetails.imageUrl ? (
                <StyledImage
                  className="w-2/3 h-52"
                  src={productDetails.imageUrl}
                  alt={productDetails.name}
                />
              ) : (
                <StyledImage
                  className="w-2/3 h-52"
                  source={require("../../assets/images/placeholder.png")}
                  alt={productDetails.name}
                />
              )}
            </StyledView>
          </StyledView>

          {/* Nome e preço do produto */}
          <StyledText className="text-xl mt-4 font-bold">
            {productDetails.name}
          </StyledText>
          <StyledView>
            <StyledText className="font-bold text-light-green text-3xl mt-1">
              {`R$${productDetails.price.toFixed(2).replace(".", ",")}`}
            </StyledText>
          </StyledView>

          {/* Quantidade do prato principal */}
          <StyledView className="flex flex-row w-full items-center justify-between pt-3 gap-x-2 my-3">
            <StyledTouchableOpacity
              onPress={() => setMainQuantity(mainQuantity + 1)}
              className="bg-[#5ECD81] rounded-md py-2 w-32 flex justify-center items-center"
            >
              <StyledText className="text-white">Adicionar</StyledText>
            </StyledTouchableOpacity>
            {[2, 5, 10].map((qty) => (
              <TouchableOpacity
                key={qty}
                onPress={() => setMainQuantity(mainQuantity + qty)}
              >
                <StyledView
                  className={`border-[1px] rounded-md p-2 w-14 flex items-center justify-center ${
                    qty === mainQuantity ? "bg-[#5ECD81]" : "border-[#8B8B93]"
                  }`}
                >
                  <StyledText
                    className={
                      qty === mainQuantity ? "text-white" : "text-[#8B8B93]"
                    }
                  >
                    +{qty}
                  </StyledText>
                </StyledView>
              </TouchableOpacity>
            ))}
          </StyledView>

          {/* Lista de Complementos */}
          <StyledText className="font-bold text-lg mt-4 mb-2">
            Escolha seus complementos
          </StyledText>
          {complements.map((complement) => (
            <StyledView
              key={complement.id}
              className="flex flex-row justify-between items-center mb-3"
            >
              <StyledText className="text-base">{complement.name}</StyledText>
              <StyledView className="flex flex-row items-center">
                <TouchableOpacity
                  onPress={() =>
                    handleComplementQuantity(complement.id, "decrease")
                  }
                  disabled={mainQuantity === 0}
                >
                  <StyledText className="text-2xl text-[#A3A3A3]">-</StyledText>
                </TouchableOpacity>
                <StyledText className="px-3">
                  {complementQuantities[complement.id] || 0}
                </StyledText>
                <TouchableOpacity
                  onPress={() =>
                    handleComplementQuantity(complement.id, "increase")
                  }
                  disabled={mainQuantity === 0}
                >
                  <StyledText className="text-2xl text-[#5ECD81]">+</StyledText>
                </TouchableOpacity>
              </StyledView>
            </StyledView>
          ))}

          {/* Campo de observação */}
          <StyledText className="font-bold text-lg mb-2 mt-4">
            Alguma observação?
          </StyledText>
          <StyledTextInput
            className="border-[1px] border-[#E8EDF2] rounded-md py-8 px-3 w-full"
            placeholder="Ex: Tirar a cebola, maionese à parte, etc."
            placeholderTextColor="#A3A3A3"
            maxLength={140}
            value={observation}
            onChangeText={setObservation}
          />

          {/* Div de resumo */}
          {mainQuantity > 0 && (
            <StyledView className="h-[90px] absolute -bottom-[90px] left-0 right-0 bg-white bg-opacity-50 shadow-lg rounded-t-3xl p-4">
              <StyledView className="flex flex-row justify-between items-center mb-4 pl-2">
                <TouchableOpacity
                  onPress={() => setMainQuantity(mainQuantity - 1)}
                >
                  <StyledText className="text-xl text-[#A3A3A3]">-1</StyledText>
                </TouchableOpacity>
                <StyledTouchableOpacity
                  onPress={() =>
                    addToCart({
                      foodId: productDetails.id,
                      quantity: mainQuantity,
                      foodPrice: productDetails.price,
                      foodName: productDetails.name,
                      foodImage: productDetails.imageUrl,
                      complements: Object.entries(complementQuantities)
                        .filter(([_, qty]) => qty > 0)
                        .map(([complementId, quantity]) => ({
                          complementId: parseInt(complementId, 10),
                          quantity,
                        })),
                    })
                  }
                  className="bg-[#5ECD81] p-3 rounded-md"
                >
                  <StyledText className="text-white">
                    Adicionar ao Carrinho
                  </StyledText>
                </StyledTouchableOpacity>
                <StyledText className="font-bold text-lg">{`R$${(
                  productDetails.price * mainQuantity
                )
                  .toFixed(2)
                  .replace(".", ",")}`}</StyledText>
              </StyledView>
            </StyledView>
          )}
        </StyledView>
      ) : (
        <StyledView className="w-full h-screen fixed flex items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#6c6c6c" />
        </StyledView>
      )}
      <StyledView className="mb-60"></StyledView>
    </StyledScrollView>
  );
}
