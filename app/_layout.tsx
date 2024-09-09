// app/_layout.tsx
import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [loaded, error] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null
  }

  return (
    <StyledSafeAreaView className="flex-1 min-h-screen bg-body font-poppins pt-10">
      <StatusBar style="light" backgroundColor={'#252C32'} />
      <StyledView className="flex-1">
        <Stack screenOptions={{ header: () => <></> }} />
      </StyledView>
    </StyledSafeAreaView>
  );
}
