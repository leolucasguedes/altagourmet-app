import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledTextInput,
  StyledText,
  StyledPressable
} from "../../../components/styleds/components";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function FavoritesPage() {
  const router = useRouter();

  return (
    <>
      <StyledView className="flex flex-col items-center justify-start w-full p-2">
        <StyledView className="w-full flex flex-row items-center justify-start gap-x-3 px-2 pt-4 pb-2">
          <StyledPressable onPress={() => router.back()} className="min-w-16">
            <Icon name="arrow-back" size={25} color="#8B8B93" />
          </StyledPressable>
          <StyledText className="font-semibold text-lg pl-6">Favoritos</StyledText>
        </StyledView>

        <StyledView className="w-full rounded-md px-3 py-2 mb-4 flex-row items-center">
          <StyledPressable
            onPress={() => router.back()}
            className="absolute left-5 z-50"
          >
            <Icon name="search" size={24} color="#5ECD81" />
          </StyledPressable>

          <StyledTextInput
            value={""}
            onChangeText={(text) => console.log(text)}
            className="w-full pl-10 text-sm bg-[#F8F8F8] border border-[#D4D4D4] rounded-md py-4"
            placeholder="Buscar favoritos"
            placeholderTextColor="#A3A3A3"
          />
        </StyledView>
      </StyledView>
    </>
  );
}
