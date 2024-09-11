import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Popup from './Popup';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface VerifyProps {
  redirect: string;
  codeValid: (code: string) => boolean;
}

const VerificationCodeInput: React.FC<VerifyProps> = ({ redirect, codeValid }) => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]); // Define o tipo explicitamente
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

  const handleSubmit = () => {
    if (codeValid(code.join(''))) {
      alert('Código válido!');
      // Implementar a lógica de navegação
    } else {
      setError(true);
    }
  };

  const resendCode = () => {
    setTimeLeft(60);
    // Implementar lógica de reenvio de código
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <StyledView className="items-center p-5">
      <Popup
        show={error}
        status="cancel"
        title="Código inválido"
        actions={[
          { action: () => { setCode(['', '', '', '']); setError(false); }, label: 'Tentar Novamente', type: 'primary' },
          { action: resendCode, label: 'Reenviar Código', type: 'secondary' }
        ]}
        close={() => setError(false)}
      />
      <StyledView className="flex-row justify-between w-3/4 my-4">
        {code.map((digit, index) => (
          <StyledTextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            className="w-16 h-16 text-2xl text-center border focus:border-primary outline-primary rounded bg-gray-100"
            maxLength={1}
            keyboardType="numeric"
            ref={(el) => { inputs.current[index] = el as TextInput | null; }} // Use type assertion para o tipo correto
          />
        ))}
      </StyledView>
      {timeLeft > 0 ? (
        <StyledText className="text-xs text-gray-600 mt-4">Reenviar código em <StyledText className="text-primary">{timeLeft} segundos</StyledText></StyledText>
      ) : (
        <StyledTouchableOpacity onPress={resendCode}>
          <StyledText className="text-primary text-xs mt-4">Reenviar código</StyledText>
        </StyledTouchableOpacity>
      )}
      <StyledTouchableOpacity onPress={handleSubmit} className="bg-primary text-white py-3 px-10 mt-10 rounded w-full items-center">
        <StyledText className="text-white font-bold">Continuar</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default VerificationCodeInput;
