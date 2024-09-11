import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import LogoComponent from "../../components/LogoComponent";
import PasswordInput from "../../components/PasswordInput";
import Popup from "../../components/Popup";
import useAuthStore from "../../store/authStore";
import { useAuthRegisterStore } from "../../store/authRegisterStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

// Define os tipos de navegação usando StackNavigationProp
type AuthNavigationProp = StackNavigationProp<AuthStackParamList, "Register">;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const RegisterScreen: React.FC = () => {
  const { register } = useAuthStore();
  const { data, setData } = useAuthRegisterStore();
  const authNavigation = useNavigation<AuthNavigationProp>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);
  const [terms, setTerms] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  // Função para formatar o número de telefone
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length <= 2) {
      return `+${phoneNumber}`;
    } else if (phoneNumber.length <= 4) {
      return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2)}`;
    } else if (phoneNumber.length <= 9) {
      return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(
        2,
        4
      )}) ${phoneNumber.slice(4)}`;
    }
    return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(
      2,
      4
    )}) ${phoneNumber.slice(4, 9)}-${phoneNumber.slice(9, 13)}`;
  };

  // Função para manipular o registro
  const handleRegister = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("As senhas não coincidem");
      setErrorTitle("Senhas diferentes");
      setErrorActions([
        { action: () => setError(false), label: "Fechar", type: "primary" },
      ]);
      setLoading(false);
      return;
    }
    const userCreated = await register({
      name,
      email,
      password,
      confirm_password: confirmPassword,
      phone: phone.replace(/\D/g, ""),
    });
    if (userCreated.status === 200) {
      authNavigation.navigate("RegisterSuccess");
    } else {
      setErrorMessage("Já existe uma conta com este e-mail.");
      setErrorTitle("E-Mail não validado!");
      setErrorActions([
        {
          action: () => {
            setEmail("");
            setError(false);
          },
          label: "Tentar com outro e-mail",
          type: "primary",
        },
        {
          action: () => authNavigation.navigate("Login"),
          label: "Voltar ao Login",
          type: "secondary",
        },
      ]);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <StyledScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      className="px-4 bg-white"
    >
      {loading && <ActivityIndicator size="large" color="#BF3320" />}
      <Popup
        show={error}
        status={"cancel"}
        title={errorTitle}
        actions={errorActions}
        Subtitle={() => (
          <StyledText className="text-xs text-error">{errorMessage}</StyledText>
        )}
        close={() => setError(false)}
      />
      <LogoComponent color="#BF3320" size={120} />
      <StyledText className="text-2xl my-4">
        Crie sua <StyledText className="font-bold">conta</StyledText>!
      </StyledText>
      <StyledView className="w-full">
        <StyledText className="text-xs font-semibold mb-3">
          Nome Completo *
        </StyledText>
        <StyledTextInput
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome completo"
          className="border border-grey w-full rounded py-4 px-3 mb-5 text-sm"
        />
        <StyledText className="text-xs font-semibold mb-3">E-mail *</StyledText>
        <StyledTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          className="border border-grey w-full rounded py-4 px-3 mb-5 text-sm"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <StyledText className="text-xs font-semibold mb-3">
          Telefone *
        </StyledText>
        <StyledTextInput
          value={phone}
          onChangeText={(text) => setPhone(formatPhoneNumber(text))}
          placeholder="+55 (99)9 9999-9999"
          className="border border-grey w-full rounded py-4 px-3 mb-5 text-sm"
          keyboardType="phone-pad"
        />
        <StyledText className="text-xs font-semibold mb-3">Senha *</StyledText>
        <PasswordInput
          placeholder="Digite sua senha"
          password={password}
          setPassword={setPassword}
        />
        <StyledText className="text-xs font-semibold my-3">
          Confirme sua Senha *
        </StyledText>
        <PasswordInput
          placeholder="Digite novamente sua senha"
          password={confirmPassword}
          setPassword={setConfirmPassword}
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
            </StyledText>{" "}
            *
          </StyledText>
        </StyledView>
        <StyledTouchableOpacity
          onPress={handleRegister}
          className="bg-primary py-4 rounded mt-7"
        >
          <StyledText className="text-white text-center">Cadastrar</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <StyledText className="text-dark-grey text-xs mt-4">
        Já tem uma conta?{" "}
        <StyledTouchableOpacity
          onPress={() => authNavigation.navigate("Login")}
        >
          <StyledText className="text-primary font-semibold">
            Faça login!
          </StyledText>
        </StyledTouchableOpacity>
      </StyledText>
    </StyledScrollView>
  );
};

export default RegisterScreen;
