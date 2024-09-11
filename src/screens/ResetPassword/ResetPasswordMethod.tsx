import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../../components/LogoComponent";
import Popup from "../../components/Popup";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

type AuthNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "ResetPasswordVerify",
  "Register"
>;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ResetPasswordMethod: React.FC = () => {
  const [error, setError] = useState(false);
  const [method, setMethod] = useState("");
  const authNavigation = useNavigation<AuthNavigationProp>();

  const sendRequest = () => {
    if (!method) {
      setError(true);
    } else {
      authNavigation.navigate("ResetPasswordVerify");
    }
  };

  return (
    <StyledView className="flex-1 items-center justify-around px-10 bg-white">
      <Popup
        show={error}
        status="cancel"
        title="Telefone não validado!"
        actions={[
          {
            action: () => authNavigation.navigate("Register"),
            label: "Cadastrar",
            type: "secondary",
          },
        ]}
        Subtitle={() => (
          <StyledText className="text-xs text-error">
            Não foi encontrada nenhuma conta vinculada a esse email
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <StyledView className="items-center">
        <LogoComponent color="#BF3320" size={120} />
        <StyledText className="text-2xl my-4">
          Trocar <StyledText className="font-bold">senha</StyledText>
        </StyledText>
        <StyledText className="text-xs mb-5 text-center">
          Selecione a melhor forma de contato para receber o código e trocar sua
          senha.
        </StyledText>
        <StyledTouchableOpacity
          onPress={() => setMethod("sms")}
          className={`border p-4 rounded-lg my-2 ${
            method === "sms" ? "border-primary" : "border-grey"
          }`}
        >
          <StyledText className="text-center">SMS</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          onPress={() => setMethod("email")}
          className={`border p-4 rounded-lg my-2 ${
            method === "email" ? "border-primary" : "border-grey"
          }`}
        >
          <StyledText className="text-center">E-mail</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <StyledTouchableOpacity
        onPress={sendRequest}
        className="bg-primary py-4 rounded mb-3 w-full"
      >
        <StyledText className="text-white text-center">Continuar</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ResetPasswordMethod;
