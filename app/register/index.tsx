import React, { useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
  StyledPressable,
  StyledTextInput,
} from "@/components/styleds/components";
import { useRouter } from "expo-router";
import useAuthStore from "@/store/authStore";
import PasswordInput from "@/components/passwordInput";
import Popup from "@/components/popup";
import Loading from "@/components/loading";
import LogoIcon from "@/components/icons/logo";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RegisterScreen() {
  const { register, token } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendRequest = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("As senhas não coincidem");
      setErrorTitle("Senhas diferentes");
      setErrorActions([
        {
          action: () => {
            setError(false);
          },
          label: "Fechar",
          type: "primary",
        },
      ]);
      setLoading(false);
      return;
    }
    const userCreated = await register({
      name,
      email,
      password,
      confirm_password: confirmPassword,
    });
    if (userCreated.status === 200) {
      router.push("/register/success");
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
          action: () => router.push("/login"),
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
      className="flex-1 bg-white p-4"
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      {loading && <Loading />}
      <Popup
        show={error}
        status="cancel"
        title={errorTitle}
        actions={errorActions}
        Subtitle={() => (
          <StyledText className="text-xs text-[#DC2626]">
            {errorMessage}
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <LogoIcon fillColor="#238878" />
      <StyledText className="text-2xl my-4">
        Crie sua <StyledText className="font-bold">conta</StyledText>!
      </StyledText>
      <StyledView className="w-full px-4">
        <StyledText className="text-xs font-bold mb-3">
          Nome Completo
        </StyledText>
        <StyledView className="border border-gray-300 rounded-lg px-4 py-2 mb-5 flex-row items-center">
          <Icon name="person-outline" size={18} color="#A3A3A3" />
          <StyledTextInput
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#A3A3A3"
            className="ml-2 flex-1"
          />
        </StyledView>
        <StyledText className="text-xs font-bold mb-3">E-Mail</StyledText>
        <StyledView className="border border-gray-300 rounded-lg px-4 py-2 mb-5 flex-row items-center">
          <Icon name="email" size={18} color="#A3A3A3" />
          <StyledTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#A3A3A3"
            keyboardType="email-address"
            className="ml-2 flex-1"
          />
        </StyledView>
        <StyledText className="text-xs font-bold mb-3">Senha</StyledText>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          withIcon={true}
        />
        <StyledText className="text-xs font-bold mb-3">
          Confirme sua Senha
        </StyledText>
        <PasswordInput
          password={confirmPassword}
          setPassword={setConfirmPassword}
          placeholder="Digite novamente sua senha"
          withIcon={true}
        />
        <StyledPressable
          onPress={sendRequest}
          className="bg-[#5ECD81] rounded-md py-4 my-7"
        >
          <StyledText className="text-center text-white">Cadastrar</StyledText>
        </StyledPressable>
      </StyledView>
      <StyledText className="text-[#A3A3A3] text-xs">
        Já tem uma conta?{" "}
        <StyledPressable onPress={() => router.push("/login")}>
          <StyledText className="font-semibold mt-0.5">Faça login!</StyledText>
        </StyledPressable>
      </StyledText>
    </StyledScrollView>
  );
}
