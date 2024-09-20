import React, { useState, useRef, useEffect } from "react";
import {
  StyledView,
  StyledText,
  StyledPressable,
} from "@/components/styleds/components";
import { TextInput, Keyboard, Clipboard } from "react-native";
import { Href, useRouter } from "expo-router";
import Popup from "@/components/popup";
import { buttonCN } from "@/components/classnames";

type VerifyProps = {
  redirect: string;
  codeValid: (code: string) => boolean;
};

const VerificationCodeInput = ({ redirect, codeValid }: VerifyProps) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = async () => {
    const pasteData = await Clipboard.getString();
    const pasteCode = pasteData.split("").slice(0, 4);

    if (pasteCode.length === 4) {
      setCode(pasteCode);
      pasteCode.forEach((value, index) => {
        if (inputs.current[index]) {
          inputs.current[index]?.setNativeProps({ text: value });
        }
      });
      inputs.current[3]?.focus();
    }
  };

  const verifyCode = async (e: any) => {
    e.preventDefault();
    Keyboard.dismiss();

    if (!codeValid(code.join(""))) {
      setError(true);
      return;
    }

    router.push(redirect as Href);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resendCode = () => {
    setTimeLeft(60);
    // Implementar a lógica de envio de novo código
  };

  return (
    <>
      <Popup
        show={error}
        status={"cancel"}
        title={"Código inválido"}
        actions={[
          {
            action: () => {
              setCode(["", "", "", ""]);
              setError(false);
            },
            label: "Tentar Novamente",
            type: "primary",
          },
          { action: resendCode, label: "Reenviar Código", type: "secondary" },
        ]}
        Subtitle={() => (
          <StyledText className="text-xs text-error">
            O código inserido não é válido.
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <StyledView className="flex flex-col w-full px-10 items-center justify-center">
        <StyledView className="w-full flex flex-col items-center justify-center">
          <StyledView className="flex justify-center items-center gap-3 w-full mx-auto">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                placeholder="-"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyDown(e, index)}
                onFocus={handlePaste}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                style={{
                  width: 60,
                  height: 60,
                  fontSize: 24,
                  textAlign: "center",
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  backgroundColor: "#F5F5F5",
                  borderRadius: 10,
                }}
              />
            ))}
          </StyledView>
          {timeLeft > 0 ? (
            <StyledText className="text-xs text-dark-grey mt-4">
              Reenviar código em{" "}
              <StyledText className="text-ascents">
                {timeLeft} segundos
              </StyledText>
            </StyledText>
          ) : (
            <StyledPressable onPress={resendCode}>
              <StyledText className="text-ascents text-xs cursor-pointer mt-4">
                Reenviar código
              </StyledText>
            </StyledPressable>
          )}
        </StyledView>

        <StyledPressable
          className={buttonCN + " mb-3 w-full mt-20"}
          onPress={verifyCode}
        >
          <StyledText>Continuar</StyledText>
        </StyledPressable>
      </StyledView>
    </>
  );
};

export default VerificationCodeInput;
