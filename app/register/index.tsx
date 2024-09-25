import React, { useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
  StyledPressable,
  StyledTextInput,
  StyledKeyboardAvoidingView,
} from "@/components/styleds/components";
import { Link, Href, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import useAuthStore from "@/store/authStore";
import PasswordInput from "@/components/passwordInput";
import Popup from "@/components/popup";
import Loading from "@/components/loading";
import LogoIcon from "@/components/icons/logo";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconAnt from "react-native-vector-icons/AntDesign";

export default function RegisterScreen() {
  const { register, token } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendRequest = async () => {
    setLoading(true);
    if (!name || !email || !phone || !document || !password || !confirmPassword) {
      setError(true);
      setErrorMessage("Preencha todos os campos");
      setErrorTitle("Campos vazios");
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
      phone,
      name,
      email,
      document,
      address: 'definir',
      password,
    });
    console.log(userCreated);
    if (userCreated) {
      router.push("/register/success");
    } else {
      setError(true);
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
      <StyledKeyboardAvoidingView className="w-full" behavior='position'>
        <StyledView className="w-full flex flex-col items-center justify-center">
          <LogoIcon fillColor="#238878" />
          <StyledText className="text-2xl my-4">
            Crie sua <StyledText className="font-bold">conta</StyledText>!
          </StyledText>
        </StyledView>
        <StyledView className="w-full px-4">
          <StyledText className="text-xs font-bold mb-1.5">
            Nome Completo
          </StyledText>
          <StyledView className="border border-[#D4D4D4] rounded-md px-3 py-2 mb-4 flex-row items-center">
            <Icon name="person-outline" size={18} color="#A3A3A3" />
            <StyledTextInput
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#A3A3A3"
              className="ml-2 flex-1"
            />
          </StyledView>
          <StyledText className="text-xs font-bold mb-1.5">E-Mail</StyledText>
          <StyledView className="border border-[#D4D4D4] rounded-md px-3 py-2 mb-4 flex-row items-center">
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
          <StyledText className="text-xs font-bold mb-1.5">Telefone</StyledText>
          <StyledView className="border border-[#D4D4D4] rounded-md px-3 py-2 mb-4 flex-row items-center">
            <Icon name="phone" size={18} color="#A3A3A3" />
            <StyledTextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Digite seu telefone"
              placeholderTextColor="#A3A3A3"
              keyboardType="phone-pad"
              className="ml-2 flex-1"
            />
          </StyledView>
          <StyledText className="text-xs font-bold mb-1.5">CPF</StyledText>
          <StyledView className="border border-[#D4D4D4] rounded-md px-3 py-2 mb-4 flex-row items-center">
            <IconAnt name="idcard" size={18} color="#A3A3A3" />
            <StyledTextInput
              value={document}
              onChangeText={setDocument}
              placeholder="Digite seu CPF"
              placeholderTextColor="#A3A3A3"
              className="ml-2 flex-1"
            />
          </StyledView>
          <StyledText className="text-xs font-bold mb-1.5">Senha</StyledText>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            withIcon={true}
          />
          <StyledText className="text-xs font-bold mb-1.5">
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
            className="bg-[#5ECD81] rounded-md py-4 mt-1 mb-5"
          >
            <StyledText className="text-center text-white">Cadastrar</StyledText>
          </StyledPressable>
        </StyledView>
      </StyledKeyboardAvoidingView>
      <StyledView className="flex items-center justify-center flex-row ">
        <StyledText className="text-[#A3A3A3] text-xs">
          Já tem uma conta?{" "}
        </StyledText>
        <StyledPressable className="m-0" onPress={() => router.push("/login")}>
          <StyledText className="font-semibold">Faça login!</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledScrollView>
  );
}
