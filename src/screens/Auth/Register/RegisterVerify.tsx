import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import LogoComponent from "../../../components/LogoComponent";
import TermsAndConditions from "../../../components/TermsAndConditions";
import VerificationCodeInput from "../../../components/VerificationCodeInput";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);

const RegisterVerify: React.FC = () => {
  const navigation = useNavigation();

  const codeValid = (code: string) => {
    // Implemente a validação do código
    return true;
  };

  return (
    <StyledView className="flex-1 items-center justify-center px-10 bg-white">
      <LogoComponent color="#BF3320" size={120} />
      <StyledText className="text-2xl my-4 font-bold">
        Verifique seu número
      </StyledText>
      <StyledText className="text-xs text-center mb-4">
        Enviamos um código de verificação para o e-mail informado.
      </StyledText>
      <VerificationCodeInput redirect="RegisterSuccess" codeValid={codeValid} />{" "}
      {/* Ajuste a navegação conforme necessário */}
      <TermsAndConditions />
    </StyledView>
  );
};

export default RegisterVerify;
