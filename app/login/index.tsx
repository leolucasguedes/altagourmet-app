import React, { useEffect, useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
  StyledPressable,
  StyledTextInput,
  StyledImage,
} from "../../components/styleds/components";
import { Href, Link, useRouter, useRootNavigationState } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import useAuthStore from "../../store/authStore";
import PasswordInput from "../../components/passwordInput";
import Popup from "../../components/popup";
import Loading from "../../components/loading";
import LogoIcon from "../../components/icons/logo";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);

  useEffect(() => {
    if (!isInitialCheckDone && navigationState?.key) {
      if (isAuthenticated) {
        router.push("/" as Href);
      }
      setIsInitialCheckDone(true);
    }
  }, [navigationState?.key, isAuthenticated, isInitialCheckDone, router]);

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

    if (!logged) {
      setError(true);
      setErrorTitle("E-mail ou senha inválidos");
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
      router.push("/" as Href);
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

        <StyledImage
          className="w-52 h-52"
          source={require("../../assets/images/icon.png")}
          alt="Logo"
        />
        
        <StyledText className="text-2xl mb-5">
          Faça seu <StyledText className="font-bold">login</StyledText>!
        </StyledText>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, actions) => {
            const errors = await actions.validateForm();
            if (Object.keys(errors).length > 0) {
              actions.setSubmitting(false);
              return;
            }
            handleLogin(values, actions);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isSubmitting,
          }) => (
            <StyledView className="w-full px-4">
              {/* Campo E-mail */}
              <StyledText className="text-xs font-bold mb-1.5">
                E-Mail
              </StyledText>
              <StyledView
                className={`border rounded-md px-3 py-2 flex-row items-center ${
                  errors.email ? "mb-0 border-red" : "mb-4 border-[#D4D4D4]"
                }`}
              >
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
              {errors.email && (
                <StyledText className=" text-red mb-2">
                  {errors.email}
                </StyledText>
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
                error={errors.password}
              />

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
                onPress={() => handleSubmit()}
                className="bg-[#5ECD81] rounded-md py-3 my-5"
                disabled={isSubmitting}
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

        <StyledText className="text-[#A3A3A3] text-xs mt-2.5 mb-10">
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
