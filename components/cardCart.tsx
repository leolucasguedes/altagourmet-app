import React from "react";
import { StyledView, StyledText, StyledPressable } from "../components/styleds/components";
import Icon from "react-native-vector-icons/MaterialIcons";

 export const CardCart = () => {
  // Dados fake do cartão
  const card = {
    type: "MasterCard",
    method: "Crédito",
    lastFourDigits: "9843",
    owner: "John Doe",
  };

  return (
    <StyledView className="w-full px-4 py-6 border border-[#E8EDF2] rounded-lg flex flex-row items-center justify-between bg-white mb-4">
      <StyledView className="flex flex-row items-center">
        <StyledView className="mr-4 bg-[#34D399] p-2 rounded-lg">
          <Icon name="credit-card" size={24} color="#fff" />
        </StyledView>
        <StyledView>
          <StyledText className="font-semibold text-lg">
            {card.type} • {card.method}
          </StyledText>
          <StyledText className="text-[#7A7A7A]">
            •••• {card.lastFourDigits} • {card.owner}
          </StyledText>
        </StyledView>
      </StyledView>
      {/* Ícone de opções */}
      <StyledPressable>
        <Icon name="more-vert" size={24} color="#8B8B93" />
      </StyledPressable>
    </StyledView>
  );
};
