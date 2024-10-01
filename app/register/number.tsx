import React, { useState } from "react";
import {
  StyledView,
  StyledText,
  StyledPressable,
  StyledTextInput,
} from "../../components/styleds/components";
import { useRouter } from "expo-router";
import LogoIcon from "../../components/icons/logo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Popup from "../../components/popup";
import Loading from "../../components/loading";

export default function RegisterNumber() {
  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendRequest = async () => {
    setLoading(true);
    const phone = 200;
    if (phone !== 200) {
      setError(true);
      setErrorTitle("Telefone não validado!");
      setErrorActions([
        {
          action: () => {
            setError(false);
            setPhone("");
          },
          label: "Tentar com outro número",
          type: "primary",
        },
        {
          action: () => router.push("/login"),
          label: "Voltar ao login",
          type: "secondary",
        },
      ]);
    } else {
      router.push("/register/verify");
    }
    setLoading(false);
  };

  return (
    <StyledView className="flex flex-1 items-center px-10 pt-20">
      {loading && <Loading />}
      <Popup
        show={error}
        status="error"
        title={errorTitle}
        actions={errorActions}
        Subtitle={() => (
          <StyledText className="text-xs text-[#DC2626]">
            "Já existe uma conta com este número"
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <LogoIcon fillColor="#238878" />
      <StyledText className="text-2xl mt-5 mb-4">
        Informe seu <StyledText className="font-bold">telefone</StyledText>
      </StyledText>
      <StyledView className="border-b-2 border-[#D4D4D4] rounded-lg px-3 py-2 mb-4 flex-row items-center">
        <Icon name="phone" size={18} color="#A3A3A3" />
        <StyledTextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="+55 (__) _____-____"
          keyboardType="numeric"
          placeholderTextColor="#A3A3A3"
          className="ml-2 flex-1"
        />
      </StyledView>
      <StyledPressable
        className="bg-[#5ECD81] rounded-md py-4 mb-5 w-full flex justify-center items-center absolute bottom-10"
        onPress={sendRequest}
      >
        <StyledText className="text-white">Continuar</StyledText>
      </StyledPressable>
    </StyledView>
  );
}
