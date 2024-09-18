import React from "react";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "@/components/styleds/components";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import LogoIcon from "@/components/icons/logo";

export default function InitialPageScreen() {
  return (
    <>
      <StyledScrollView
        className="min-h-screen bg-white mb-20"
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <StyledView className="w-full h-[60vh] rounded-b-full overflow-hidden flex items-center justify-center">
          <LinearGradient
            colors={["#238878", "#5ECD81", "#238878"]}
            style={styles.background}
          />
          <LogoIcon />
          <StyledText className="text-white mt-4 text-center text-3xl">
            Simplifique suas{"\n"}
            <StyledText className="font-bold">compras</StyledText>, potencialize
            {"\n"}
            <StyledText className="font-bold">resultados</StyledText>!
          </StyledText>
        </StyledView>
        <StyledView className="flex flex-col items-center">
          <StyledImage
            source={require("../assets/images/home-img.png")}
            className="-mt-32 w-[255px] h-[255px]"
          />
          <StyledText className="text-center my-2">
            Conheça a Buy Farma, a solução{"\n"}
            definitiva para otimizar a compra{"\n"}e gestão de medicamento.
          </StyledText>
          <Link
            href="/home"
            className="w-full bg-light-green h-full flex justify-center items-center text-3xl text-white px-6 py-2 mt-3 rounded"
          >
            Comece Agora
          </Link>
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
});
