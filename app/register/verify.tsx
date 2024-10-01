import React, { useState, useRef } from "react";
import {
  StyledView,
  StyledText,
  StyledPressable,
  StyledTextInput,
} from "../../components/styleds/components";
import { useRouter } from "expo-router";
import LogoIcon from "../../components/icons/logo";
import Popup from "../../components/popup";
import Loading from "../../components/loading";

export default function RegisterVerify() {
  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRefs: any = useRef([]);
  const handleInputChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
      if (!value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const sendRequest = async () => {
    setLoading(true);
    const teste = 200;
    if (teste !== 200) {
      setError(true);
      setErrorTitle("Telefone não validado!");
      setErrorActions([
        {
          action: () => {
            setError(false);
            setCode(["", "", "", ""]);
          },
          label: "Tentar com outro número",
          type: "primary",
        },
        {
          action: () => router.push("/"),
          label: "Voltar ao login",
          type: "secondary",
        },
      ]);
    } else {
      router.push("/register/success");
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
            "Não foi possível verificar seu número"
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <LogoIcon fillColor="#238878" />
      <StyledText className="text-2xl mt-5 mb-2">
        Verifique seu <StyledText className="font-bold">número</StyledText>
      </StyledText>
      <StyledText className="text-xs mb-7 text-center w-5/6 px-2">
        Enviamos um código de verificação via SMS para o número informado.
      </StyledText>

      <StyledView className="flex flex-row justify-between w-full mb-3 mx-5">
        {code.map((digit, index) => (
          <StyledTextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-[70px] h-[70px] rounded-[10px] text-[24px] text-white bg-[#E4E4E4]"
            value={digit}
            onChangeText={(value) => handleInputChange(index, value)}
            keyboardType="numeric"
            placeholder="-"
            placeholderTextColor={"#A3A3A3"}
            maxLength={1}
            textAlign="center"
          />
        ))}
      </StyledView>
      <StyledText className="text-[14px] text-[#A3A3A3] mt-5">
        Reenviar código em{" "}
        <StyledText className="text-[#5ECD81]">40 segundos</StyledText>
      </StyledText>

      <StyledPressable
        className="bg-[#5ECD81] rounded-md py-4 mb-5 w-full flex justify-center items-center absolute bottom-10"
        onPress={sendRequest}
      >
        <StyledText className="text-white">Continuar</StyledText>
      </StyledPressable>
    </StyledView>
  );
}
