import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Stack, usePathname  } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Footer from '@/components/footer';
import { hide } from '@/utils/hideFooter';

const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  });
  const pathname = usePathname();
  const hideFooter = hide.includes(pathname);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null
  }

  return (
    <StyledSafeAreaView className="flex-1 min-h-screen bg-body" style={{ padding: 0 }}>
      <StatusBar style="light" translucent />
      <StyledView className="flex-1">
        <Stack screenOptions={{ header: () => <></> }} />
      </StyledView>
      {!hideFooter && <Footer />}
    </StyledSafeAreaView>
  );
}
