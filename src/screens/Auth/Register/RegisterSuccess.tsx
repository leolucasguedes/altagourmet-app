import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import LogoComponent from "../../../components/LogoComponent";
import TermsAndConditions from "../../../components/TermsAndConditions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../../navigation/types";

type MainNavigationProp = StackNavigationProp<MainStackParamList, "Home">;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const RegisterSuccess: React.FC = () => {
  const mainNavigation = useNavigation<MainNavigationProp>();

  return (
    <StyledView className="flex-1 items-center justify-center px-10 bg-white">
      <StyledView className="items-center w-full mobile:w-1/3">
        <LogoComponent color="#BF3320" size={120} />
        <StyledText className="text-2xl my-4 font-bold">Parabéns!</StyledText>
        <StyledText className="text-xs text-center mb-4 px-2">
          Sua conta foi criada com sucesso. Agora você será direcionado para
          nossa Home. Boas compras!
        </StyledText>
        <StyledTouchableOpacity
          onPress={() => mainNavigation.navigate("Home")}
          className="bg-primary py-4 rounded mt-5 w-full"
        >
          <StyledText className="text-white text-center">Continuar</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <TermsAndConditions />
    </StyledView>
  );
};

export default RegisterSuccess;
