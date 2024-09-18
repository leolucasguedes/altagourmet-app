import React from "react";
import { ActivityIndicator } from "react-native";
import { StyledView } from "@/components/styleds/components";

const Loading = () => {
  return (
    <StyledView className="absolute top-0 left-0 right-0 bottom-0 bg-primary bg-opacity-50 justify-center items-center">
      <ActivityIndicator size="large" color="#fff" />
    </StyledView>
  );
};

export default Loading;
