import React from "react";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "@/components/styleds/components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LogoIcon from "@/components/icons/logo";

export default function InitialPageScreen() {
  const router = useRouter();

  return (
    <>
      <StyledScrollView
        className="min-h-screen bg-white mb-20"
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 0,
        }}
      >
        <StyledView className="w-full h-[50vh] rounded-b-full overflow-hidden flex items-center justify-center">
          <LinearGradient
            colors={["#238878", "#5ECD81", "#238878"]}
            style={styles.background}
          />
          <LogoIcon fillColor="#FFFFFF" />
          <StyledText className="text-white mt-4 text-center text-3xl font-normal">
            Simplifique suas{"\n"}
            <StyledText className="font-bold">compras</StyledText>, potencialize
            {"\n"}
            <StyledText className="font-bold">resultados</StyledText>!
          </StyledText>
        </StyledView>
        <StyledView className="flex flex-col items-center">
          <StyledImage
            source={require("../assets/images/home-img.png")}
            className="-mt-20 w-[255px] h-[255px]"
          />
          <StyledText className="text-center mt-4 mb-2">
            Conheça a Buy Farma, a solução{"\n"}
            definitiva para otimizar a compra{"\n"}e gestão de medicamento.
          </StyledText>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            style={styles.button}
          >
            <StyledText className="text-white text-md">Comece Agora</StyledText>
          </TouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    backgroundColor: "#5ECD81",
    height: 42,
    width: "100%",
    maxWidth: 345,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 60,
    paddingHorizontal: 80,
  },
});
