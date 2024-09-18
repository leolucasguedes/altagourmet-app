import React, { useState, useEffect } from "react";
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

export default function LoginScreen() {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);
  const [password, setPassword] = useState("");

  const sendRequest = async () => {
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
          action: () => router.push("/home"),
          label: "Redefinir senha",
          type: "secondary",
        },
      ]);
    } else {
      router.push("/home");
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
          <StyledText className="text-xs">
            <b>Revise seu e-mail e senha</b> e tente novamente ou{" "}
            <b>redefina sua senha</b> para evitar o bloqueio da sua conta!
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <LogoIcon fillColor="#238878" />
      <StyledText className="text-2xl my-4">
        Faça seu <StyledText className="font-bold">login</StyledText>!
      </StyledText>
      <StyledView className="w-full px-4">
        <StyledText className="text-xs font-bold mb-3">E-Mail</StyledText>
        <StyledView className="border border-gray-300 rounded-lg px-4 py-2 mb-5 flex-row items-center">
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
        <StyledText className="text-xs font-bold mb-3">Senha</StyledText>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          withIcon={true}
        />
        <StyledPressable onPress={() => router.push("/home")}>
          <StyledText className="text-[#A3A3A3] text-xs text-right -mt-2">
            Esqueceu sua senha?
          </StyledText>
        </StyledPressable>
        <StyledPressable
          onPress={sendRequest}
          className="bg-[#5ECD81] rounded-md py-4 my-7"
        >
          <StyledText className="text-center text-white">Entrar</StyledText>
        </StyledPressable>
      </StyledView>
      <StyledText className="text-[#A3A3A3] text-xs">
        Ainda não tem uma conta?{" "}
        <StyledPressable onPress={() => router.push("/register")}>
          <StyledText className="font-semibold mt-0.5">
            Crie agora mesmo!
          </StyledText>
        </StyledPressable>
      </StyledText>
    </StyledScrollView>
  );
}
