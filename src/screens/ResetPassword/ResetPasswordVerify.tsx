import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../../components/LogoComponent";
import TermsAndConditions from "../../components/TermsAndConditions";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../navigation/types";

type MainNavigationProp = StackNavigationProp<MainStackParamList, "Home">;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ResetVerify: React.FC = () => {
  const mainNavigation = useNavigation<MainNavigationProp>();

  return (
    <StyledView className="flex-1 items-center justify-center px-10">
      <LogoComponent color="#BF3320" size={120} />
      <StyledText className="text-2xl my-4">Verifique seu e-mail</StyledText>
      <StyledText className="text-xs mb-4 text-center">
        Um link de verificação foi enviado para o seu e-mail.
      </StyledText>
      <StyledTouchableOpacity
        onPress={() => mainNavigation.navigate("Home")}
        className="bg-primary py-4 rounded mb-3 w-full"
      >
        <StyledText className="text-white text-center">Home</StyledText>
      </StyledTouchableOpacity>
      <TermsAndConditions />
    </StyledView>
  );
};

export default ResetVerify;
