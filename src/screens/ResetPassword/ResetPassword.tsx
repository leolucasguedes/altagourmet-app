import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import LogoComponent from "../../components/LogoComponent";
import Popup from "../../components/Popup";
import api from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

type AuthNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "ResetPassword"
>;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ResetPassword: React.FC = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const navigation = useNavigation<AuthNavigationProp>();

  const sendRequest = async () => {
    try {
      const res = await api.post("/forgot-password", { email });
      if (res.data.error) {
        setError(true);
      } else {
        navigation.navigate("ResetPasswordVerify");
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <StyledView className="flex-1 items-center justify-around px-10 bg-white">
      <Popup
        show={error}
        status="cancel"
        title="Error!"
        actions={[
          {
            action: () => navigation.navigate("Register"),
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
      <StyledView className="w-full items-center">
        <LogoComponent color="#BF3320" size={120} />
        <StyledText className="text-2xl my-4">
          Recuperar <StyledText className="font-bold">senha</StyledText>
        </StyledText>
        <StyledText className="text-xs text-center mb-5">
          Digite seu e-mail abaixo para receber o código e recuperar sua conta.
        </StyledText>
        <StyledTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite aqui seu e-mail"
          className="border border-grey w-full rounded py-4 px-3 mb-5 text-sm"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </StyledView>
      <StyledTouchableOpacity
        onPress={sendRequest}
        className="bg-primary py-4 rounded w-full"
      >
        <StyledText className="text-white text-center">Continuar</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ResetPassword;
