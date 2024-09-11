import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const HomeScreen: React.FC = () => {
  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledText className="text-2xl font-bold text-primary">
        Hello World
      </StyledText>
    </StyledView>
  );
};

export default HomeScreen;
