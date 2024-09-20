import React, { useEffect } from "react";
import {
  StyledSafeAreaView,
  StyledView,
} from "@/components/styleds/components";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <StyledSafeAreaView
      className="flex-1 min-h-screen bg-body"
      style={{ padding: 0 }}
    >
      <StatusBar style="light" translucent />
      <StyledView className="flex-1">
        <Stack screenOptions={{ header: () => <></> }} />
      </StyledView>
    </StyledSafeAreaView>
  );
}
