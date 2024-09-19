import React, { useState } from "react";
import {
  StyledView,
  StyledPressable,
  StyledTextInput,
} from "@/components/styleds/components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  withIcon?: boolean;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  withIcon,
  placeholder,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <StyledView className="border border-gray-300 rounded-lg pl-4 py-2 flex-row items-center mb-5">
      {withIcon && <Icon name="key" size={18} color="#A3A3A3" />}
      <StyledTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPass}
        placeholder={placeholder || "Digite sua senha"}
        placeholderTextColor="#A3A3A3"
        className="ml-2 flex-1"
      />
      <StyledPressable onPress={() => setShowPass(!showPass)} className="pr-4">
        <Icon
          name={showPass ? "eye-outline" : "eye-off-outline"}
          size={18}
          color="#525252"
        />
      </StyledPressable>
    </StyledView>
  );
};

export default PasswordInput;
