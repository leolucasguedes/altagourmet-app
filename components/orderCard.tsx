import React from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledText,
  StyledPressable,
} from "../components/styleds/components";

export const OrderCard = () => {
  const router = useRouter();

  // Dados fake para o exemplo
  const order = {
    id: "#5121",
    status: "Pedido em andamento",
    total: "R$ 40,47",
    items: 2,
  };

  return (
    <StyledView className="w-full p-4 border border-[#7A7A7A] rounded-lg flex flex-col items-start justify-between bg-white shadow-md">
      <StyledView className="flex flex-row justify-between items-center w-full mb-2">
        <StyledText className="font-normal text-[#7A7A7A] text-sm">
          {order.status}
        </StyledText>
        <StyledText className="font-normal text-sm text-[#12100B]">
          {order.id}
        </StyledText>
      </StyledView>

      <StyledView className="flex flex-row justify-between items-center w-full mt-2">
        <StyledText className="text-xl font-bold">{order.total}</StyledText>
        <StyledText className="font-normal text-sm text-[#12100B]">
          Total {order.items} Itens
        </StyledText>
      </StyledView>

      <StyledView className="flex flex-row justify-between items-center w-full mt-5">
        <StyledPressable
          className="flex-[1] bg-transparent border border-[#34D399] rounded-lg py-4 mr-2 justify-center items-center"
          onPress={() => router.push("/app/orders")}
        >
          <StyledText className="text-[#34D399] font-normal">
            Cancelar
          </StyledText>
        </StyledPressable>
        <StyledPressable
          className="flex-[2] bg-[#34D399] rounded-lg py-4 justify-center items-center"
          onPress={() => router.push("/app/orders")}
        >
          <StyledText className="text-white font-normal">
            Acompanhar Pedido
          </StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
};
