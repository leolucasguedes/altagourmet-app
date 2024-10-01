import React, { useState } from "react";
import {
  StyledView,
  StyledPressable,
  StyledTextInput,
  StyledText,
} from "../components/styleds/components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  withIcon?: boolean;
  placeholder?: string;
  onBlur?: (e: any) => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  withIcon,
  placeholder,
  onBlur,
  error,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <StyledView
        className={`border rounded-md px-3 py-2 flex-row items-center ${
          error ? "border-red mb-0" : "border-[#D4D4D4] mb-4"
        }`}
      >
        {withIcon && <Icon name="key" size={18} color="#A3A3A3" />}
        <StyledTextInput
          value={password}
          onChangeText={setPassword}
          onBlur={onBlur}
          secureTextEntry={!showPass}
          placeholder={placeholder || "Digite sua senha"}
          placeholderTextColor="#A3A3A3"
          className="ml-2 flex-1"
        />
        <StyledPressable onPress={() => setShowPass(!showPass)}>
          <Icon
            name={showPass ? "eye-outline" : "eye-off-outline"}
            size={18}
            color="#525252"
          />
        </StyledPressable>
      </StyledView>
      {error && <StyledText className="text-red mb-2">{error}</StyledText>}
    </>
  );
};

export default PasswordInput;
