import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import LogoComponent from "../../../components/LogoComponent";
import TermsAndConditions from "../../../components/TermsAndConditions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../../navigation/types";

type AuthNavigationProp = StackNavigationProp<AuthStackParamList, "Login">;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const RegisterError: React.FC = () => {
  const authNavigation = useNavigation<AuthNavigationProp>();

  return (
    <StyledView className="flex-1 items-center justify-center px-10 bg-white">
      <StyledView className="items-center w-full mobile:w-1/3">
        <LogoComponent color="#BF3320" size={120} />
        <StyledText className="text-2xl my-4 font-bold">
          Erro ao criar conta
        </StyledText>
        <StyledText className="text-xs text-center mb-4 px-2">
          Não foi possível criar sua conta na Buy Motors. Você será
          redirecionado à tela de introdução do nosso app.
        </StyledText>
        <StyledTouchableOpacity
          onPress={() => authNavigation.navigate("Login")}
          className="bg-primary py-4 rounded mt-5 w-full"
        >
          <StyledText className="text-white text-center">
            Voltar ao início
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <TermsAndConditions />
    </StyledView>
  );
};

export default RegisterError;
