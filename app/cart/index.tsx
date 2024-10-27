import React, { useEffect, useState } from "react";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
  StyledTouchableOpacity,
} from "../../components/styleds/components";
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import IconAnt from "react-native-vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MIIcon from "react-native-vector-icons/MaterialIcons";
import api from "../../utils/api";
import ProductCard from "../../components/productCard";
import useHomeContentStore from "../../store/homeContentStore";
import PlaceHolderImage from "../../components/PlaceHolderImage";

export default function CartPage() {
  const router = useRouter();
  const { emptyCart, addToCart, removeFromCart, userCart, totalValue } =
    useCartStore();
  const { homeData } = useHomeContentStore();
  const { token } = useAuthStore();
  const [loading, setLoading] = React.useState(false);
  const [buyMore, setBuyMore] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchMoreProducts();
    setRefreshing(false);
  }, []);

  const fetchMoreProducts = async () => {
    try {
      const prods = await api.get("/products/page/1/20", {
        headers: { Authorization: "Bearer " + token },
      });
      setBuyMore(prods.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMoreProducts();
    }
  }, [token]);

  const handleQuantityChange = (foodId: number, action: "add" | "remove") => {
    const item = userCart.find((cartItem) => cartItem.foodId === foodId);
    if (item) {
      if (action === "add") {
        addToCart({ ...item, quantity: 1 });
      } else if (action === "remove" && item.quantity > 1) {
        addToCart({ ...item, quantity: -1 });
      } else {
        removeFromCart(foodId);
      }
    }
  };

  const cleanCart = async () => {
    if (loading) return;
    setLoading(true);
    await emptyCart();
    setLoading(false);
  };
  return (
    <>
      <StyledView className="w-full flex flex-row items-center justify-between px-4 bg-white">
        <TouchableOpacity style={{ width: "25%" }}>
          <IconAnt
            name="arrowleft"
            size={25}
            color="#A3A3A3"
            onPress={() => router.back()}
          />
        </TouchableOpacity>
        <StyledText className="font-bold text-lg text-center">
          Meu Carrinho
        </StyledText>
        <TouchableOpacity
          style={{
            width: "25%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
          onPress={cleanCart}
        >
          <StyledText className="text-dark-green">Limpar</StyledText>
        </TouchableOpacity>
      </StyledView>
      <StyledScrollView
        className="min-h-screen bg-white w-full"
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "100%",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StyledView className="flex flex-col gap-y-2 px-4 w-full">
          <StyledView className="w-full pt-4 pb-2">
            <StyledText className="text-lg font-bold">Produtos</StyledText>
          </StyledView>
          {userCart.length === 0 ? (
            <StyledText className="w-full text-center">
              Carrinho vazio
            </StyledText>
          ) : (
            userCart.map((item, index) => (
              <StyledView
                key={index}
                className="w-full flex flex-row items-center justify-between mb-4"
              >
                <StyledView className="flex flex-row items-center justify-between gap-3">
                  <StyledView className="p-1 w-14 h-14 rounded border-[1px] border-[#E8EDF2]">
                    {item.foodImage ? (
                      <StyledImage
                        className="w-full h-full"
                        src={item.foodImage}
                        alt={item.foodName}
                      />
                    ) : (
                      <PlaceHolderImage category={"food"} />
                    )}
                  </StyledView>
                  <StyledView>
                    <StyledText className="font-bold text-base">
                      {item.foodName}
                    </StyledText>
                    <StyledText className="text-sm text-gray-700">
                      R${item.foodPrice.toFixed(2).replace(".", ",")}
                    </StyledText>
                  </StyledView>
                </StyledView>
                <StyledView className="flex flex-row items-center justify-between rounded border-[1px] gap-2 border-[#E8EDF2] bg-[#F8F8F8] pb-2">
                  <TouchableOpacity
                    disabled={loading}
                    style={{ paddingHorizontal: 5 }}
                    onPress={() => handleQuantityChange(item.foodId, "remove")}
                  >
                    <FAIcon
                      name="minus"
                      size={18}
                      color="#5ECD81"
                      style={{ width: 18, height: 18 }}
                    />
                  </TouchableOpacity>
                  <StyledText className="font-bold">{item.quantity}</StyledText>
                  <TouchableOpacity
                    disabled={loading}
                    style={{ paddingHorizontal: 5 }}
                    onPress={() => handleQuantityChange(item.foodId, "add")}
                  >
                    <FAIcon
                      name="plus"
                      size={18}
                      color="#5ECD81"
                      style={{ width: 18, height: 18 }}
                    />
                  </TouchableOpacity>
                </StyledView>
              </StyledView>
            ))
          )}
          <StyledView className="w-full flex items-center justify-center mt-4">
            <Link href={"/"}>
              <StyledText className="text-light-green py-3">
                Adicionar mais itens
              </StyledText>
            </Link>
          </StyledView>
        </StyledView>
        <StyledView className="w-full px-4 py-6 bg-white border-t border-gray-200">
          <StyledText className="font-bold text-xl mb-2">
            Total: R${totalValue.toFixed(2).replace(".", ",")}
          </StyledText>
          <StyledTouchableOpacity
            className="w-full bg-[#5ECD81] py-4 rounded-lg mt-4"
            onPress={cleanCart}
          >
            <StyledText className="text-white text-center font-bold">
              Finalizar Compra
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
        <StyledView className="w-full mb-24">
          <StyledView className="w-full flex px-4 py-3">
            <StyledText className="font-bold my-4 text-xl">
              Peça Também
            </StyledText>
            <StyledScrollView horizontal className="w-full">
              {buyMore.length === 0 && (
                <StyledView className="w-full flex items-center justify-center">
                  <ActivityIndicator color={"#7a7a7a"} size={20} />
                </StyledView>
              )}
              {buyMore.length > 0 &&
                buyMore.map((item, key) => (
                  <StyledView key={key} className="mx-2 w-40">
                    <ProductCard product={item} />
                  </StyledView>
                ))}
            </StyledScrollView>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </>
  );
}
