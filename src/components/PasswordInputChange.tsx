import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styled } from "nativewind";
import { EyeIcon } from "react-native-heroicons/outline";

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  placeholder: string;
  correct?: boolean;
}

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PasswordInputChange: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  placeholder,
  correct,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <StyledView
      className={`flex-row items-center border ${
        !correct && password ? "border-red-500" : "border-grey"
      } rounded py-4 px-3 mb-5`}
    >
      <StyledTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPass}
        placeholder={placeholder}
        className="flex-1 text-sm"
      />
      <StyledTouchableOpacity onPress={() => setShowPass(!showPass)}>
        {showPass ? (
          <EyeIcon size={20} color="gray" />
        ) : (
          <EyeIcon size={20} color="gray" />
        )}
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default PasswordInputChange;
