import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

export default function Loading() {
  return (
    <StyledView className="absolute inset-0 bg-dark/50 flex items-center justify-center z-50">
      <ActivityIndicator size="large" color="#BF3320" />
    </StyledView>
  );
}
