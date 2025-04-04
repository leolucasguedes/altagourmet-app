import React, { useState } from "react";
import api from "../../utils/api";
import {
  StyledView,
  StyledText,
  StyledPressable,
  StyledTextInput,
  StyledImage
} from "../../components/styleds/components";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ResetPassword() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const sendRequest = async () => {
    try {
      const res = await api.post(`/forgot-password`, {
        email: email,
      });
      if (res.data.error) {
        setError(true);
        console.log(res.data.error);
      } else {
        router.push("/resetpassword/verify");
      }
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <StyledView className="flex flex-1 items-center px-10 pt-5">
      <StyledImage
            className="w-52 h-52"
            source={require("../../assets/images/icon.png")}
            alt="Logo"
          />
      <StyledText className="text-2xl mt-5 mb-2">
        Recuperar <StyledText className="font-bold">senha</StyledText>
      </StyledText>
      <StyledText className="text-xs mb-8 text-center w-5/6 px-2">
        Digite seu e-mail abaixo para receber o código e recuperar sua conta.
      </StyledText>
      <StyledView className="border-b-2 border-[#D4D4D4] rounded-lg px-3 py-1 mb-4 flex-row items-center">
        <Icon name="email-outline" size={18} color="#A3A3A3" />
        <StyledTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite aqui seu e-mail"
          keyboardType="email-address"
          placeholderTextColor="#A3A3A3"
          className="ml-2 flex-1 font-poppins"
        />
      </StyledView>
      <StyledPressable
        className="bg-[#5ECD81] rounded-md py-3 mb-5 w-full flex justify-center items-center absolute bottom-10"
        onPress={() => router.push("/resetpassword/verify")}
      >
        <StyledText className="text-white">Continuar</StyledText>
      </StyledPressable>
    </StyledView>
  );
}
