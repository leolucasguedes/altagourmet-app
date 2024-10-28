import React, { useState, useEffect } from "react";
import {
  StyledScrollView,
  StyledText,
  StyledView,
  StyledTouchableOpacity,
  StyledTextInput,
} from "../../../../components/styleds/components";
import { TouchableOpacity } from "react-native";
import IconAnt from "react-native-vector-icons/AntDesign";
import { useRouter } from "expo-router";
import useCartStore from "../../../../store/cartStore";
import useAuthStore from "../../../../store/authStore";
import MIIcon from "react-native-vector-icons/MaterialIcons";

export default function CheckoutReview() {
  const router = useRouter();
  const { emptyCart, checkout, removeFromCart, userCart, totalValue } =
    useCartStore();
  const { token, isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = React.useState(false);
  const [method, setMethod] = React.useState("pix");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState<number>(0);
  const [complement, setComplement] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      setWhatsapp(user.phone);
      setAddress(user.address);
      setNumber(user.number as number);
      setComplement(user.complement || "");
    }
  }, [isAuthenticated, user]);

  const handleCheckout = async () => {
    setLoading(true);
    const success = await checkout({
      userId: isAuthenticated ? user?.id : "",
      whatsapp,
      address,
      number: typeof number === "string" ? parseInt(number, 10) : number,
      complement,
    });
    setLoading(false);

    if (success) {
      router.push("/"); // Redireciona para a página do QR Code
    } else {
      alert("Falha ao finalizar o pedido. Tente novamente.");
    }
  };

  const cleanCart = async () => {
    if (loading) return;
    setLoading(true);
    await emptyCart();
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
              Informe seu whatsapp
            </StyledText>
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
            <StyledText className="text-sm text-gray">R$ 7,99</StyledText>
          </StyledView>
          <StyledView className="w-full flex flex-row items-center justify-between">
            <StyledText className="text-sm text-gray">
              Itens em Promoção
            </StyledText>
            <StyledText className="text-light-green font-bold text-sm">
              - R$ 0,00
            </StyledText>
          </StyledView>
          <StyledView className="w-full flex flex-row items-center justify-between mb-4">
            <StyledText className="text-lg font-bold">Total</StyledText>
            <StyledText className="text-dark-green font-bold text-lg">
              R$ {totalValue + 7.99}
            </StyledText>
          </StyledView>

          <StyledText className="text-lg font-bold mt-4">
            Informações de Contato
          </StyledText>
          <StyledTextInput
            placeholder="Whatsapp"
            keyboardType="numeric"
            placeholderTextColor={"#A3A3A3"}
            maxLength={11}
            value={whatsapp}
            onChangeText={setWhatsapp}
            className="w-full border border-gray rounded-md p-3"
          />
          <StyledTextInput
            placeholder="Endereço"
            placeholderTextColor={"#A3A3A3"}
            value={address}
            onChangeText={setAddress}
            className="w-full border border-gray rounded-md p-3 mt-2"
          />
          <StyledTextInput
            placeholder="Número"
            placeholderTextColor={"#A3A3A3"}
            value={String(number)}
            onChangeText={(text) => setNumber(parseInt(text))}
            keyboardType="numeric"
            className="w-full border border-gray rounded-md p-3 mt-2"
          />
          <StyledTextInput
            placeholder="Complemento (Opcional)"
            placeholderTextColor={"#A3A3A3"}
            value={complement}
            onChangeText={setComplement}
            className="w-full border border-gray rounded-md p-3 mt-2 mb-4"
          />

          <StyledText className="font-bold text-lg w-full text-start mt-4">
            Forma de Pagamento
          </StyledText>
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
          <StyledView className="rounded-lg w-full border-[1px] px-3 py-4 border-[#dadada] flex flex-row items-start justify-between">
            <StyledView className="flex flex-row items-center gap-x-4">
              <MIIcon
                name="attach-money"
                size={25}
                color="#238878"
                style={{ width: 25, height: 25 }}
              />
              <StyledText className="font-bold text-lg">Dinheiro</StyledText>
            </StyledView>
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
        </StyledView>
        <StyledTouchableOpacity
          className="w-full bg-[#5ECD81] py-4 rounded-lg mt-4 mb-32"
          onPress={cleanCart}
        >
          <StyledText className="text-white text-center font-bold">
            Finalizar Compra
          </StyledText>
        </StyledTouchableOpacity>
        <StyledView className="mb-32"></StyledView>
      </StyledScrollView>
    </>
  );
}
