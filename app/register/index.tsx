import React, { useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
  StyledPressable,
  StyledTextInput,
  StyledKeyboardAvoidingView,
} from "@/components/styleds/components";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import useAuthStore from "@/store/authStore";
import PasswordInput from "@/components/passwordInput";
import Popup from "@/components/popup";
import Loading from "@/components/loading";
import LogoIcon from "@/components/icons/logo";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconF from "react-native-vector-icons/Fontisto";
import IconAnt from "react-native-vector-icons/AntDesign";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const { register } = useAuthStore();
  const router = useRouter();

  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome completo é obrigatório."),
    email: Yup.string()
      .email("E-mail inválido.")
      .required("O e-mail é obrigatório."),
    password: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .required("A senha é obrigatória."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "As senhas devem coincidir.")
      .required("A confirmação de senha é obrigatória."),
  });

  const handleRegister = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const { name, email, password, confirmPassword } = values;

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
      setErrorTitle("E-mail já cadastrado!");
      setErrorMessage("Já existe uma conta com este e-mail.");
      setErrorActions([
        {
          action: () => setError(false),
          label: "Fechar",
          type: "primary",
        },
        {
          action: () => {
            setError(false);
            router.push("/");
          },
          label: "Ir para Login",
          type: "secondary",
        },
      ]);
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
        {/* Exibir Popup de erro quando `error` for true */}
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

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
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
              {/* Campo Nome Completo */}
              <StyledText className="text-xs font-bold mb-1.5">
                Nome Completo
              </StyledText>
              <StyledView className="border border-[#D4D4D4] rounded-md px-3 py-2 mb-4 flex-row items-center">
                <Icon name="person-outline" size={18} color="#A3A3A3" />
                <StyledTextInput
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="#A3A3A3"
                  className="ml-2 flex-1"
                />
              </StyledView>
              {touched.name && errors.name && (
                <StyledText className="text-red-500">{errors.name}</StyledText>
              )}

              {/* Campo E-mail */}
              <StyledText className="text-xs font-bold mb-1.5">
                E-mail
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

              {/* Campo Confirmar Senha */}
              <StyledText className="text-xs font-bold mb-1.5">
                Confirme sua Senha
              </StyledText>
              <PasswordInput
                password={values.confirmPassword}
                setPassword={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                placeholder="Digite novamente sua senha"
                withIcon={true}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <StyledText className="text-red-500">
                  {errors.confirmPassword}
                </StyledText>
              )}

              {/* Botão de envio */}
              <StyledPressable
                onPress={() => handleSubmit()}
                className="bg-[#5ECD81] rounded-md py-3 mt-1 mb-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <StyledText className="text-center text-white">
                    Cadastrar
                  </StyledText>
                )}
              </StyledPressable>
            </StyledView>
          )}
        </Formik>
      </StyledScrollView>
    </KeyboardAvoidingView>
  );
}
