import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledText,
  StyledPressable
} from "@/components/styleds/components";
import useAuthStore from "@/store/authStore";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function TermsPage() {
  const router = useRouter();

  return (
    <>
      <StyledView className="flex flex-col items-center justify-start w-full p-2">
        <StyledView className="w-full flex flex-row items-center justify-start gap-x-3 px-2 pt-4 pb-2">
          <StyledPressable onPress={() => router.back()} className="min-w-16">
            <Icon name="arrow-back" size={25} color="#0A0A0A" />
          </StyledPressable>
          <StyledText className="font-semibold text-lg pl-4">Termos e Condições de Uso</StyledText>
        </StyledView>

        <StyledView className="w-full rounded-md px-3 py-2 mb-4 flex-row items-center">
          
        </StyledView>
      </StyledView>
    </>
  );
}
