import React, { useEffect } from "react";
import {
  StyledSafeAreaView,
  StyledView,
} from "../components/styleds/components";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
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
      className="flex-1 min-h-screen bg-white"
      style={{ padding: 0 }}
    >
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <StyledView className="flex-1">
        <Slot />
      </StyledView>
    </StyledSafeAreaView>
  );
}
