import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styled } from "nativewind";
import LogoComponent from "../../components/LogoComponent";
import PasswordInputChange from "../../components/PasswordInputChange";
import Popup from "../../components/Popup";
import api from "../../utils/api";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

type ResetPasswordChangeNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "ResetPasswordChange"
>;
type ResetPasswordChangeRouteProp = RouteProp<
  AuthStackParamList,
  "ResetPasswordChange"
>;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ResetPasswordChange: React.FC = () => {
  const [error, setError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [inputError, setInputError] = useState(false);

  const navigation = useNavigation<ResetPasswordChangeNavigationProp>();
  const route = useRoute<ResetPasswordChangeRouteProp>();
  const { token, email } = route.params;

  const sendRequest = async () => {
    setPasswordError("");
    setInputError(false);

    if (password !== confirmPassword) {
      setError(true);
      return;
    }

    try {
      const res = await api.post(
        "/reset-password",
        {
          email,
          token,
          password,
          password_confirmation: confirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        navigation.navigate("ResetPasswordSuccess");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const apiError = error.response.data.errors.password?.[0];
        setPasswordError(apiError);
        setInputError(true);
      }
    }
  };

  return (
    <StyledView className="flex-1 items-center justify-around px-10 bg-white">
      <Popup
        show={error}
        status="cancel"
        title="Senhas não coincidem"
        actions={[
          {
            action: () => setError(false),
            label: "Tentar Novamente",
            type: "primary",
          },
        ]}
        Subtitle={() => (
          <StyledText className="text-xs">
            <StyledText className="font-bold">Verifique a senha</StyledText> e
            tente novamente.
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <StyledView className="w-full items-center">
        <LogoComponent color="#BF3320" size={120} />
        <StyledText className="text-2xl my-4">
          Crie uma <StyledText className="font-bold">nova senha</StyledText>
        </StyledText>
        <StyledText className="text-xs font-semibold mb-2 w-full text-start">
          E-mail
        </StyledText>
        <StyledText className="border border-grey w-full rounded py-4 px-3 mb-5 text-sm bg-[#f5f5f5]">
          {email}
        </StyledText>
        <StyledText className="text-xs font-semibold mb-2 w-full text-start">
          Nova senha
        </StyledText>
        <PasswordInputChange
          placeholder="Digite sua senha"
          password={password}
          setPassword={setPassword}
          correct={inputError}
        />
        <StyledText className="text-xs font-semibold mb-2 mt-4 w-full text-start">
          Confirme sua nova senha
        </StyledText>
        <PasswordInputChange
          placeholder="Digite novamente sua senha"
          password={confirmPassword}
          setPassword={setConfirmPassword}
          correct={inputError}
        />
        {passwordError && (
          <StyledText className="text-red-500 text-xs font-bold mt-2">
            {passwordError}
          </StyledText>
        )}
      </StyledView>
      <StyledTouchableOpacity
        onPress={sendRequest}
        className="bg-primary py-4 rounded w-full my-10"
      >
        <StyledText className="text-white text-center">
          Alterar Senha
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ResetPasswordChange;
