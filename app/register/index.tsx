import React, { useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
  StyledPressable,
  StyledTextInput,
  StyledImage,
} from "../../components/styleds/components";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import useAuthStore from "../../store/authStore";
import PasswordInput from "../../components/passwordInput";
import Popup from "../../components/popup";
import Loading from "../../components/loading";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

interface FormValues {
  name: string;
  email: string;
  phone: string;
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
    phone: Yup.string()
      .matches(/^\d{10,11}$/, "Telefone inválido.")
      .required("O telefone é obrigatório."),
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
    const { name, email, phone, password, confirmPassword } = values;

    const userCreated = await register({
      name,
      email,
      phone,
      address: "definir",
      password,
    });

    if (userCreated) {
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
            router.push("/login");
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <StyledScrollView
        className="flex-1 bg-white p-4"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
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
        <StyledView className="w-full flex flex-col items-center justify-center">
          <StyledImage
            className="w-52 h-52"
            source={require("../../assets/images/icon.png")}
            alt="Logo"
          />
          <StyledText className="text-2xl mb-5">
            Crie sua <StyledText className="font-bold">conta</StyledText>!
          </StyledText>
        </StyledView>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, actions) => {
            const errors = await actions.validateForm();
            if (Object.keys(errors).length > 0) {
              actions.setSubmitting(false);
              return;
            }
            handleRegister(values, actions);
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
              {/* Campo Nome Completo */}
              <StyledText className="text-xs font-bold mb-1.5">
                Nome Completo
              </StyledText>
              <StyledView
                className={`border rounded-md px-3 py-2 flex-row items-center ${
                  errors.name ? "mb-0 border-red" : "mb-4 border-[#D4D4D4]"
                }`}
              >
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
              {errors.name && (
                <StyledText className="text-red mb-2">{errors.name}</StyledText>
              )}

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
                <StyledText className="text-red mb-2">
                  {errors.email}
                </StyledText>
              )}

              {/* Campo Telefone */}
              <StyledText className="text-xs font-bold mb-1.5">
                Telefone
              </StyledText>
              <StyledView
                className={`border rounded-md px-3 py-2 flex-row items-center ${
                  errors.phone ? "mb-0 border-red" : "mb-4 border-[#D4D4D4]"
                }`}
              >
                <Icon name="phone" size={18} color="#A3A3A3" />
                <StyledTextInput
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  placeholder="Digite seu telefone"
                  keyboardType="phone-pad"
                  placeholderTextColor="#A3A3A3"
                  className="ml-2 flex-1"
                />
              </StyledView>
              {errors.phone && (
                <StyledText className="text-red mb-2">
                  {errors.phone}
                </StyledText>
              )}

              {/* Campo CPF 
              <StyledText className="text-xs font-bold mb-1.5">CPF</StyledText>
              <StyledView
                className={`border rounded-md px-3 py-2 flex-row items-center ${
                  errors.document ? "mb-0 border-red" : "mb-4 border-[#D4D4D4]"
                }`}
              >
                <IconAnt name="idcard" size={18} color="#A3A3A3" />
                <StyledTextInput
                  value={values.document}
                  onChangeText={handleChange("document")}
                  onBlur={handleBlur("document")}
                  placeholder="Digite seu CPF"
                  keyboardType="numeric"
                  placeholderTextColor="#A3A3A3"
                  className="ml-2 flex-1"
                />
              </StyledView>
              {errors.document && (
                <StyledText className="text-red mb-2">
                  {errors.document}
                </StyledText>
              )}
              */}

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
                error={errors.confirmPassword}
              />

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

        <StyledView className="flex items-center justify-center flex-row mb-16">
          <StyledText className="text-[#A3A3A3] text-xs">
            Já tem uma conta?{" "}
          </StyledText>
          <StyledPressable
            className="m-0"
            onPress={() => router.push("/login")}
          >
            <StyledText className="font-semibold">Faça login!</StyledText>
          </StyledPressable>
        </StyledView>
      </StyledScrollView>
    </KeyboardAvoidingView>
  );
}
