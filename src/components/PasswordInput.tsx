import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface PasswordInputProps extends TextInputProps {
  password?: string;
  setPassword?: (value: string) => void;
  withIcon?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword, withIcon, ...props }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <StyledView className="border border-grey w-full flex-row items-center justify-between rounded py-4 px-3">
      {withIcon && <Icon name="vpn-key" size={20} color="#000" />} {/* Ícone de chave */}
      <StyledTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPass}
        className="flex-1 ml-2 text-sm"
        {...props}
      />
      <StyledTouchableOpacity onPress={() => setShowPass(!showPass)}>
        <Icon name={showPass ? 'visibility' : 'visibility-off'} size={20} color={showPass ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,1)'} />
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default PasswordInput;
