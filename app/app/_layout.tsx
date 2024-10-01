import LoginValidator from "../../hooks/loginValidate";
import Footer from "../../components/footer";
import { StyledView } from "../../components/styleds/components";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/header";

export default function Layout() {
  return (
    <>
      <LoginValidator />
      <StatusBar style="light" translucent />
      <StyledView className="flex-1 py-8">
        <Stack screenOptions={{ header: () => <Header /> }} />
      </StyledView>
      <Footer />
    </>
  );
}
