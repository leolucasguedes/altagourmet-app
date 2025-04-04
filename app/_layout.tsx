import React, { useEffect } from "react";
import {
  StyledSafeAreaView,
  StyledView,
} from "../components/styleds/components";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const pathname = usePathname();
  const noFooterPages = ["/login", "/register", "/resetpassword"];
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
        <Stack screenOptions={{ header: () => <Header /> }} />
      </StyledView>
      {!noFooterPages.includes(pathname) && <Footer />}
    </StyledSafeAreaView>
  );
}
