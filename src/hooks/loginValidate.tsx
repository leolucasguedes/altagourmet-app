import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { styled } from "nativewind";
import useAuthStore from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/types";

type AuthNavigationProp = StackNavigationProp<AuthStackParamList, "Login">;

const StyledView = styled(View);

const LoginValidator = () => {
  const {
    isAuthenticated,
    getMe,
    getPosts,
    getSubscriptions,
    logout,
    getFavorites,
  } = useAuthStore();
  const authNavigation = useNavigation<AuthNavigationProp>();

  const verifyLogged = async () => {
    const authJSON = localStorage.getItem("auth");
    const auth = JSON.parse(authJSON || "");
    if (!auth.state.isAuthenticated) {
      authNavigation.navigate("Login");
    } else {
      const validLogin = await getMe();
      if (!validLogin) {
        logout();
        authNavigation.navigate("Login");
      } else {
        await getPosts();
        await getSubscriptions();
        await getFavorites();
      }
    }
  };

  useEffect(() => {
    verifyLogged();
  }, []);

  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      {!isAuthenticated && <Loading />}
    </StyledView>
  );
};

export default LoginValidator;
