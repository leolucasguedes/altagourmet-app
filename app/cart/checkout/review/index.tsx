import React from "react";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "../../../../components/styleds/components";
import { TouchableOpacity } from "react-native";
import IconAnt from "react-native-vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import useCartStore from "../../../../store/cartStore";
import useAuthStore from "../../../../store/authStore";
import MIIcon from "react-native-vector-icons/MaterialIcons";
import useHomeContentStore from "../../../../store/homeContentStore";
import useShippingStore from "../../../../store/shippingStore";
import FontistoIcon from "react-native-vector-icons/Fontisto";
export default function CheckoutReview() {
  const router = useRouter();
  const {
    emptyCart,
    addToCart,
    removeFromCart,
    userCart,
    fetchUserCart,
    totalValue,
  } = useCartStore();
  const { shipping_fee } = useShippingStore();
  const { homeData } = useHomeContentStore();
  const { token } = useAuthStore();
  const [loading, setLoading] = React.useState(false);
  const [method, setMethod] = React.useState("");

  const cleanCart = async () => {
    if (loading) return;
    setLoading(true);
    await emptyCart(token || "");
    router.push("/cart");
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
          justifyContent: "flex-start",
          minHeight: "100%",
        }}
      >
        <StyledView className="flex flex-col px-4 w-full gap-y-2">
          <StyledView className="w-full pt-4 pb-2">
            <StyledText className="text-lg font-bold">
              Resumo da Compra
            </StyledText>
          </StyledView>
          <StyledView className="w-full flex flex-row items-center justify-between my-3">
            <StyledView className="flex flex-row items-center gap-3">
              <MIIcon
                name="discount"
                size={25}
                color="#238878"
                style={{ transform: [{ scaleX: -1 }], width: 25, height: 25 }}
              />
              <StyledView>
                <StyledText className="text-lg font-bold text-black">
                  Cupom
                </StyledText>
                <StyledText className="text-xs text-gray">
                  {8} disponíveis nessa loja
                </StyledText>
              </StyledView>
            </StyledView>
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledText className="text-lg font-bold text-dark-green">
                Adicionar
              </StyledText>
            </TouchableOpacity>
          </StyledView>
          <StyledText className="text-lg font-bold ">
            Resumo da Compra
          </StyledText>
          <StyledView className="w-full flex flex-row items-center justify-between">
            <StyledText className="text-sm text-gray">Subtotal</StyledText>
            <StyledText className="text-sm text-gray">
              R$ {totalValue.toFixed(2).replace(".", ",")}
            </StyledText>
          </StyledView>
          <StyledView className="w-full flex flex-row items-center justify-between">
            <StyledText className="text-sm text-gray">
              Taxa de Entrega
            </StyledText>
            <StyledText className="text-sm text-gray">
              R$ {shipping_fee.toFixed(2).replace(".", ",")}
            </StyledText>
          </StyledView>
          <StyledView className="w-full flex flex-row items-center justify-between">
            <StyledText className="text-sm text-gray">
              Itens em Promoção
            </StyledText>
            <StyledText className="text-light-green font-bold text-sm">
              - R$ 0,00
            </StyledText>
          </StyledView>
          <StyledView className="w-full flex flex-row items-center justify-between">
            <StyledText className="text-lg font-bold">Total</StyledText>
            <StyledText className="text-dark-green font-bold text-lg">
              R$ {(totalValue + shipping_fee).toFixed(2).replace(".", ",")}
            </StyledText>
          </StyledView>
          <StyledText className="font-bold text-lg w-full text-start my-2">
            Forma de Pagamento
          </StyledText>
          <StyledView
            className="rounded-lg w-full border-[1px] px-3 py-2 border-[#dadada] flex flex-row items-start justify-between min-h-12"
            style={{
              backgroundColor: method === "card1" ? "#acfec6" : "transparent",
            }}
          >
            <TouchableOpacity onPress={() => setMethod("card1")}>
              <StyledView className="flex flex-row items-center gap-x-4">
                <FontistoIcon
                  name="wallet"
                  size={30}
                  color="#238878"
                  style={{ width: 30, height: 30 }}
                />
                <StyledView className="flex flex-col items-start justify-center">
                  <StyledText className="font-bold text-lg">
                    MasterCard • Crédito
                  </StyledText>
                  <StyledText>**** 9843 • Diogo Archanjo</StyledText>
                </StyledView>
              </StyledView>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 3,
                paddingTop: 8,
              }}
            >
              <StyledView className="bg-dark-green rounded-full w-[5px] h-[5px]"></StyledView>
              <StyledView className="bg-dark-green rounded-full w-[5px] h-[5px]"></StyledView>
              <StyledView className="bg-dark-green rounded-full w-[5px] h-[5px]"></StyledView>
            </TouchableOpacity>
          </StyledView>
          <StyledView
            className="rounded-lg w-full border-[1px] px-3 py-4 border-[#dadada] flex flex-row items-start justify-between"
            style={{
              backgroundColor: method === "pix" ? "#acfec6" : "transparent",
            }}
          >
            <TouchableOpacity onPress={() => setMethod("pix")}>
              <StyledView className="flex flex-row items-center gap-x-4">
                <MIIcon
                  name="pix"
                  size={25}
                  color="#238878"
                  style={{ width: 25, height: 25 }}
                />
                <StyledText className="font-bold text-lg w-[70%]">
                  PIX
                </StyledText>
              </StyledView>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 3,
                paddingTop: 8,
              }}
            >
              <StyledView className="bg-dark-green rounded-full w-[5px] h-[5px]"></StyledView>
              <StyledView className="bg-dark-green rounded-full w-[5px] h-[5px]"></StyledView>
              <StyledView className="bg-dark-green rounded-full w-[5px] h-[5px]"></StyledView>
            </TouchableOpacity>
          </StyledView>
          {/* <StyledView className='rounded-lg w-full border-[1px] px-3 py-4 border-[#dadada] flex flex-row items-start justify-between'>
                        <StyledView className='flex flex-row items-center gap-x-4'>
                            <MIIcon name="pix" size={25} color="#238878" style={{ width: 25, height: 25 }} />
                            <StyledText className='font-bold text-lg'>Dinheiro</StyledText>
                        </StyledView>
                        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 3, paddingTop: 8 }}>
                            <StyledView className='bg-dark-green rounded-full w-[5px] h-[5px]'></StyledView>
                            <StyledView className='bg-dark-green rounded-full w-[5px] h-[5px]'></StyledView>
                            <StyledView className='bg-dark-green rounded-full w-[5px] h-[5px]'></StyledView>
                        </TouchableOpacity>
                    </StyledView> */}
          <StyledView className="w-full flex items-center justify-center">
            <TouchableOpacity>
              <StyledText className="text-light-green w-full">
                Adicionar novo cartão
              </StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </>
  );
}
