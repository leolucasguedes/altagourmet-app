import React, { useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
  StyledPressable,
  StyledTextInput,
} from "@/components/styleds/components";
import { Link, Href, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import useAuthStore from "@/store/authStore";
import PasswordInput from "@/components/passwordInput";
import Popup from "@/components/popup";
import Loading from "@/components/loading";
import LogoIcon from "@/components/icons/logo";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconF from "react-native-vector-icons/Fontisto";

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <StyledScrollView
        className="flex-1 bg-white p-4"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          marginTop: 20,
        }}
      >
        {loading && <Loading />}
        <Popup
          show={error}
          status="error"
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
        <StyledText className="text-2xl my-5">
          Crie sua <StyledText className="font-bold">conta</StyledText>!
        </StyledText>
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
            <StyledText className="text-center text-white">
              Cadastrar
            </StyledText>
          </StyledPressable>
        </StyledView>
        <StyledView className="flex-row items-center my-1.5 w-full px-4">
          <StyledView className="flex-1 h-[1px] bg-[#D4D4D4]"></StyledView>
          <StyledText className="text-[#737373] mx-3 text-sm">
            Ou continue com
          </StyledText>
          <StyledView className="flex-1 h-[1px] bg-[#D4D4D4]"></StyledView>
        </StyledView>
        <StyledView className="flex-row justify-center my-4 space-x-4">
          {/* Botão Facebook */}
          <StyledPressable
            onPress={() => console.log("Login com Facebook")}
            className="flex items-center justify-center border border-[#D4D4D4] rounded-full py-[3px] px-[15px]"
          >
            <IconF name="facebook" size={20} color="#0078F6" />
          </StyledPressable>

          {/* Botão Google */}
          <StyledPressable
            onPress={() => console.log("Login com Google")}
            className="flex items-center justify-center border border-[#D4D4D4] rounded-full py-[3px] px-[11px]"
          >
            <IconF name="google" size={20} color="#DB4437" />
          </StyledPressable>

          {/* Botão Apple */}
          <StyledPressable
            onPress={() => console.log("Login com Apple")}
            className="flex items-center justify-center border border-[#D4D4D4] rounded-full p-2"
          >
            <Icon name="apple" size={26} color="black" />
          </StyledPressable>
        </StyledView>
        <StyledText className="text-[#A3A3A3] text-xs mb-14">
          Já tem uma conta?{" "}
          <Link href={"/login" as Href}>
            <StyledText className="font-semibold text-xs text-black mt-0.5">
              Faça login!
            </StyledText>
          </Link>
        </StyledText>
      </StyledScrollView>
    </KeyboardAvoidingView>
  );
}
