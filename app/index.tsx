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
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/app/home" as Href);
    }
  }, [isAuthenticated]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail inválido.")
      .required("O e-mail é obrigatório."),
    password: Yup.string().required("A senha é obrigatória."),
  });

  const handleLogin = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const { email, password } = values;

    const logged = await login(email, password);

    if (logged.statusCode !== 200) {
      setError(true);
      setErrorTitle("Usuário ou senha incorretos");
      setErrorMessage("Revise seu e-mail e senha e tente novamente.");
      setErrorActions([
        {
          action: () => {
            setError(false);
            setSubmitting(false);
          },
          label: "Tentar Novamente",
          type: "primary",
        },
        {
          action: () => {
            setError(false);
            router.push("/resetpassword");
          },
          label: "Redefinir senha",
          type: "secondary",
        },
      ]);
    } else {
      router.push("/app/home");
    }

    setSubmitting(false);
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
        {/* Exibir o popup de erro */}
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

        {/* Formulário com Formik */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <StyledView className="w-full px-4">
              {/* Campo E-mail */}
              <StyledText className="text-xs font-bold mb-1.5">
                E-Mail
              </StyledText>
              <StyledView className="border border-[#D4D4D4] rounded-md px-3 py-2 mb-4 flex-row items-center">
                <Icon name="email" size={18} color="#A3A3A3" />
                <StyledTextInput
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  placeholderTextColor="#A3A3A3"
                  className="ml-2 flex-1"
                />
              </StyledView>
              {touched.email && errors.email && (
                <StyledText className="text-red-500">{errors.email}</StyledText>
              )}

              {/* Campo Senha */}
              <StyledText className="text-xs font-bold mb-1.5">
                Senha
              </StyledText>
              <PasswordInput
                password={values.password}
                setPassword={handleChange("password")}
                onBlur={handleBlur("password")}
                withIcon={true}
              />
              {touched.password && errors.password && (
                <StyledText className="text-red-500">
                  {errors.password}
                </StyledText>
              )}

              {/* Link para redefinir senha */}
              <StyledPressable
                onPress={() => router.push("/resetpassword" as Href)}
              >
                <StyledText className="text-[#A3A3A3] text-xs text-right -mt-3">
                  Esqueceu sua senha?
                </StyledText>
              </StyledPressable>

              {/* Botão de envio */}
              <StyledPressable
                onPress={() => handleSubmit()} // Chama o submit do Formik sem passar o evento
                className="bg-[#5ECD81] rounded-md py-3 my-5"
                disabled={isSubmitting} // Desativa o botão enquanto está enviando
              >
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <StyledText className="text-center text-white">
                    Entrar
                  </StyledText>
                )}
              </StyledPressable>
            </StyledView>
          )}
        </Formik>

        {/* Redes sociais */}
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
