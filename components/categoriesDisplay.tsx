import React, { useEffect } from "react";
import { Href, useRouter } from "expo-router";
import {
  StyledImage,
  StyledPressable,
  StyledText,
  StyledView,
} from "./styleds/components";
import useHomeContentStore from "@/store/homeContentStore";

export default function CategoriesDisplay() {
  const { getAllCategories, categories } = useHomeContentStore();
  const router = useRouter();

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories();
    }
  }, []);

  return (
    <StyledView className="px-4 flex flex-row flex-wrap w-full">
      {categories.map((category) => (
        <StyledPressable
          key={category.id}
          className="w-1/4 p-2"
          onPress={() => router.push(`/category/${category.id}` as Href)}
        >
          <StyledImage source={category.image} className="w-16 h-16" />
          <StyledText className="text-center text-xs text-nowrap mt-1">{`${category.name}`}</StyledText>
        </StyledPressable>
      ))}
    </StyledView>
  );
}
