import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/types";

type MainNavigationProp = StackNavigationProp<MainStackParamList, "Terms">;

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TermsAndConditions: React.FC = () => {
  const navigation = useNavigation<MainNavigationProp>();

  return (
    <StyledView className="my-5">
      <StyledText className="text-[10px]">
        <StyledTouchableOpacity onPress={() => navigation.navigate("Terms")}>
          <StyledText className="text-ascents border-b border-ascents hover:opacity-80">
            Termos
          </StyledText>
        </StyledTouchableOpacity>{" "}
        e{" "}
        <StyledTouchableOpacity onPress={() => navigation.navigate("Terms")}>
          <StyledText className="text-ascents border-b border-ascents hover:opacity-80">
            Condições
          </StyledText>
        </StyledTouchableOpacity>
      </StyledText>
    </StyledView>
  );
};

export default TermsAndConditions;
