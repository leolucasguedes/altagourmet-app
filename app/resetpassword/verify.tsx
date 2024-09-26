import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import LogoIcon from "@/components/icons/logo";
import PasswordInput from "@/components/passwordInput";
import {
  StyledView,
  StyledText,
  StyledPressable,
  StyledTextInput,
} from "@/components/styleds/components";
import Icon from "react-native-vector-icons/Ionicons";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import Popup from "@/components/popup";
import Loading from "@/components/loading";

export default function ResetPasswordVerify() {
  const [step, setStep] = useState(1);
  const [choose, setChoose] = useState("");
  const [error, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorActions, setErrorActions] = useState<any[]>([]);
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleStepChange = (value: string) => {
    if (value === "phone") {
      setStep(2);
    }

    if (value === "email") {
      setStep(3);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Popup
        show={error}
        status="error"
        title={errorTitle}
        actions={errorActions}
        Subtitle={() => (
          <StyledText className="text-xs text-[#DC2626]">
            "O código inserido não é válido"
          </StyledText>
        )}
        close={() => setError(false)}
      />
      {step === 1 ? (
        <StyledView className="flex flex-1 items-center justify-center px-10">
          <LogoIcon fillColor="#238878" />
          <StyledText className="text-2xl mt-5 mb-2">
            Trocar <StyledText className="font-bold">senha</StyledText>
          </StyledText>
          <StyledText className="text-xs mb-3 text-center w-full mx-2">
            Selecione a melhor forma de contato para receber o código e trocar
            sua senha.
          </StyledText>
          <StyledView className="flex flex-col items-center justify-between w-full h-[220px] mx-5 mb-16 mt-2">
            <StyledPressable
              onPress={() => setChoose("phone")}
              className={`w-full p-2 flex flex-row rounded-[10px] items-center border ${
                choose === "phone" ? "border-[#5ECD81]" : "border-[#E5E5E5]"
              }`}
            >
              <StyledView className="w-[70px] h-[70px] m-2 flex items-center justify-center rounded-full bg-[#A3A3A3]">
                <IconM
                  name="message-processing-outline"
                  size={40}
                  color="white"
                />
              </StyledView>
              <StyledView className="items-start ml-2">
                <StyledText className="text-xs text-[#A3A3A3]">
                  Via SMS
                </StyledText>
                <StyledText className="text-base text-black">
                  +55 (21) ********89
                </StyledText>
              </StyledView>
            </StyledPressable>
            <StyledPressable
              onPress={() => setChoose("email")}
              className={`w-full p-2 flex flex-row rounded-[10px] items-center border ${
                choose === "email" ? "border-[#5ECD81]" : "border-[#E5E5E5]"
              }`}
            >
              <StyledView className="w-[70px] h-[70px] m-2 flex items-center justify-center rounded-full bg-[#A3A3A3]">
                <Icon name="mail-outline" size={40} color="white" />
              </StyledView>
              <StyledView className="items-start ml-2">
                <StyledText className="text-xs text-[#A3A3A3]">
                  Via E-Mail
                </StyledText>
                <StyledText className="text-base text-black">
                  buy*****@gmail.com
                </StyledText>
              </StyledView>
            </StyledPressable>
          </StyledView>

          <StyledPressable
            className="bg-[#5ECD81] rounded-md py-4 mb-5 w-full flex justify-center items-center absolute bottom-10"
            onPress={() => handleStepChange(choose)}
          >
            <StyledText className="text-white">Continuar</StyledText>
          </StyledPressable>
        </StyledView>
      ) : step === 2 ? (
        <StyledView className="flex flex-1 items-center pt-16 px-10">
          <LogoIcon fillColor="#238878" />
          <StyledText className="text-2xl mt-5 mb-2">
            Verifique o <StyledText className="font-bold">código</StyledText>
          </StyledText>
          <StyledText className="text-xs mb-5 text-center w-full px-2">
            Código enviado para +55 (21) ********89
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
            className="bg-[#5ECD81] rounded-md py-3 mb-5 w-full flex justify-center items-center absolute bottom-10"
            onPress={() => handleInputChange}
          >
            <StyledText className="text-white">Continuar</StyledText>
          </StyledPressable>
        </StyledView>
      ) : step === 3 ? (
        <StyledView className="flex flex-1 items-center pt-16 px-10">
          <LogoIcon fillColor="#238878" />
          <StyledText className="text-2xl mt-5 mb-2 font-bold">
            Verifique o <StyledText className="font-bold">código</StyledText>
          </StyledText>
          <StyledText className="text-xs mb-5 text-center w-full px-2">
            Código enviado para ********@gmail.com
          </StyledText>
          <StyledView className="flex flex-row justify-between w-full mb-3 mx-5">
            {code.map((digit, index) => (
              <StyledTextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-[70px] h-[70px] rounded-[10px] text-[24px] text-black font-bold bg-[#E4E4E4]"
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
            className="bg-[#5ECD81] rounded-md py-3 mb-5 w-full flex justify-center items-center absolute bottom-10"
            onPress={() => handleInputChange}
          >
            <StyledText className="text-white">Continuar</StyledText>
          </StyledPressable>
        </StyledView>
      ) : step === 4 ? (
        <StyledView className="flex flex-1 items-center pt-16 px-10">
          <LogoIcon fillColor="#238878" />

          <StyledText className="text-2xl mt-5 mb-2">
            Crie uma <StyledText className="font-bold">nova senha</StyledText>
          </StyledText>
          <StyledView className="w-full mt-3">
            <StyledText className="text-xs font-bold mb-1.5">
              Nova Senha
            </StyledText>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              withIcon={true}
            />
            <StyledText className="text-xs font-bold mb-1.5">
              Confirme sua nova Senha
            </StyledText>
            <PasswordInput
              password={confirmPassword}
              setPassword={setConfirmPassword}
              placeholder="Digite novamente sua senha"
              withIcon={true}
            />
          </StyledView>
          <StyledPressable
            className="bg-[#5ECD81] rounded-md py-3 mb-5 w-full flex justify-center items-center absolute bottom-10"
            onPress={() => router.push("/resetpassword/success")}
          >
            <StyledText className="text-white">Continuar</StyledText>
          </StyledPressable>
        </StyledView>
      ) : (
        <StyledView className="flex flex-1 items-center justify-center">
          <StyledText className="text-[#DC2626]">Passo inválido</StyledText>
          <StyledPressable
            className="bg-[#5ECD81] rounded-md py-3 mb-5 w-full flex justify-center items-center absolute bottom-10"
            onPress={() => router.push("/")}
          >
            <StyledText className="text-white">Voltar ao login</StyledText>
          </StyledPressable>
        </StyledView>
      )}
    </>
  );
}
