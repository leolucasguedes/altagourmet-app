import React, { useState, useEffect } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
  StyledPressable,
  StyledTextInput,
} from "@/components/styleds/components";
import { Href, Link, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import useAuthStore from "@/store/authStore";
import PasswordInput from "@/components/passwordInput";
import Popup from "@/components/popup";
import Loading from "@/components/loading";
import LogoIcon from "@/components/icons/logo";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconF from "react-native-vector-icons/Fontisto";

export default function LoginScreen() {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/app/home" as Href);
    }
  }, [isAuthenticated]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);
  const [password, setPassword] = useState("");

  const sendRequest = async () => {
    if (!email || !password) {
      setError(true);
      setErrorTitle("Preencha todos os campos");
      return;
    }
    setLoading(true);
    const logged = await login(email, password);
    if (logged.statusCode !== 200) {
      setError(true);
      setErrorTitle("Usuário ou senha incorretos");
      setErrorActions([
        {
          action: () => {
            setError(false);
            setPassword("");
          },
          label: "Tentar Novamente",
          type: "primary",
        },
        {
          action: () => router.push("/resetpassword"),
          label: "Redefinir senha",
          type: "secondary",
        },
      ]);
    } else {
      router.push("/app/home");
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
            <StyledText className="text-xs">
              <StyledText className="font-bold">
                Revise seu e-mail e senha
              </StyledText>{" "}
              e tente novamente ou{" "}
              <StyledText className="font-bold">redefina sua senha</StyledText>{" "}
              para evitar o bloqueio da sua conta!
            </StyledText>
          )}
          close={() => setError(false)}
        />
        <LogoIcon fillColor="#238878" />
        <StyledText className="text-2xl my-5">
          Faça seu <StyledText className="font-bold">login</StyledText>!
        </StyledText>
        <StyledView className="w-full px-4">
          <StyledText className="text-xs font-bold mb-1.5">E-Mail</StyledText>
          <StyledView className="border border-[#D4D4D4] rounded-md px-3 py-2 mb-4 flex-row items-center">
            <Icon name="email" size={18} color="#A3A3A3" />
            <StyledTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
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
          <StyledPressable
            onPress={() => router.push("/resetpassword" as Href)}
          >
            <StyledText className="text-[#A3A3A3] text-xs text-right -mt-2">
              Esqueceu sua senha?
            </StyledText>
          </StyledPressable>
          <StyledPressable
            onPress={() => router.push("/app/home")}
            className="bg-[#5ECD81] rounded-md py-4 my-5"
          >
            <StyledText className="text-center text-white">Entrar</StyledText>
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
        <StyledText className="text-[#A3A3A3] text-xs mt-2.5 mb-7">
          Ainda não tem uma conta?{" "}
          <Link href={"/register" as Href}>
            <StyledText className="font-semibold text-xs text-black">
              Crie agora mesmo!
            </StyledText>
          </Link>
        </StyledText>
      </StyledScrollView>
    </KeyboardAvoidingView>
  );
}
