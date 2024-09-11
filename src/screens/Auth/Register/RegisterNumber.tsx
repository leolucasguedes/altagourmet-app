import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styled } from "nativewind";
import LogoComponent from "../../../components/LogoComponent";
import Popup from "../../../components/Popup";
import TermsAndConditions from "../../../components/TermsAndConditions";
import { useAuthRegisterStore } from "../../../store/authRegisterStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../../navigation/types";

type AuthNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login",
  "RegisterVerify"
>;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const RegisterNumber: React.FC = () => {
  const { setData } = useAuthRegisterStore();
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(false);
  const [num, setNum] = useState("");
  const authNavigation = useNavigation<AuthNavigationProp>();

  const numberExists = (num: string) => {
    return false; // Implemente sua lógica aqui
  };

  const handleRegister = () => {
    if (numberExists(num)) {
      setError(true);
      return;
    }
    setData("phone", num);
    setData("terms", terms);
    // Faça a request necessária aqui
    authNavigation.navigate("RegisterVerify");
  };

  return (
    <StyledView className="flex-1 items-center justify-center px-10 bg-white">
      <Popup
        show={error}
        status="cancel"
        title="Telefone não validado!"
        actions={[
          {
            action: () => {
              setNum("");
              setError(false);
            },
            label: "Tentar com outro número",
            type: "primary",
          },
          {
            action: () => authNavigation.navigate("Login"),
            label: "Voltar ao Login",
            type: "secondary",
          },
        ]}
        Subtitle={() => (
          <StyledText className="text-xs text-error">
            Já existe uma conta com este número.
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <LogoComponent color="#BF3320" size={120} />
      <StyledText className="text-2xl my-4 font-bold">
        Informe seu telefone
      </StyledText>
      <StyledView className="w-full mobile:w-1/3">
        <StyledTextInput
          value={num}
          onChangeText={setNum}
          placeholder="+55 (21) 12345-6789"
          className="border-b border-grey py-2 text-sm mb-5"
          keyboardType="phone-pad"
        />
        <StyledView className="flex-row items-center mt-3">
          <StyledTouchableOpacity
            onPress={() => setTerms(!terms)}
            className="mr-2"
          >
            <StyledView
              className={`w-5 h-5 ${
                terms ? "bg-primary" : "border border-grey"
              } rounded`}
            />
          </StyledTouchableOpacity>
          <StyledText className="text-xs">
            Eu concordo com as{" "}
            <StyledText className="text-ascents underline">
              políticas
            </StyledText>{" "}
            e{" "}
            <StyledText className="text-ascents underline">
              termos de uso
            </StyledText>
          </StyledText>
        </StyledView>
        <StyledTouchableOpacity
          onPress={handleRegister}
          className="bg-primary py-4 rounded mt-7 w-full"
        >
          <StyledText className="text-white text-center">Cadastrar</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <TermsAndConditions />
    </StyledView>
  );
};

export default RegisterNumber;
