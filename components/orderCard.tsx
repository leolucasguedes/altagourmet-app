import React from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledText,
  StyledPressable,
} from "../components/styleds/components";

interface OrderCardProps {
  order: {
    id: string;
    status: string;
    totalAmount: number;
    items: number;
  };
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();

  return (
    <StyledView className="w-full p-4 border border-[#7A7A7A] rounded-lg flex flex-col items-start justify-between bg-white shadow-md">
      <StyledView className="flex flex-row justify-between items-center w-full mb-2">
        <StyledText className="font-normal text-[#7A7A7A] text-sm">
          {order.status}
        </StyledText>
        <StyledText className="font-normal text-sm text-[#12100B]">
          #{order.id}
        </StyledText>
      </StyledView>

      <StyledView className="flex flex-row justify-between items-center w-full mt-2">
        <StyledText className="text-xl font-bold">
          R${order.totalAmount.toFixed(2).replace(".", ",")}
        </StyledText>
        <StyledText className="font-normal text-sm text-[#12100B]">
          Total {order.items} Itens
        </StyledText>
      </StyledView>

      <StyledView className="flex flex-row justify-between items-center w-full mt-5">
        <StyledPressable
          className="flex-[1] bg-transparent border border-[#34D399] rounded-lg py-4 mr-2 justify-center items-center"
          onPress={() => router.push("/cart")}
        >
          <StyledText className="text-[#34D399] font-normal">
            Cancelar
          </StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
};
