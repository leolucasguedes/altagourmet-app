import React from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
  StyledImage,
  StyledView,
  StyledText,
} from "../components/styleds/components";
import { Link } from "expo-router";
import { formatPrice } from "../utils/textFormat";

const { width: screenWidth } = Dimensions.get("window");

const MainOffersSlider = ({ bestSellers }: any) => {
  const renderOfferItem = ({ item }: any) => (
    <StyledView className="flex flex-col items-center justify-center rounded-lg border border-gray p-2 w-40">
      <Link
        href={`/product/${item.id}`}
        className="flex items-center justify-center overflow-hidden rounded-lg w-full h-32"
      >
        {item.imageUrl ? (
          <StyledImage
            className="w-full h-full object-cover"
            src={item.imageUrl}
            alt={item.name}
          />
        ) : (
          <StyledImage
            className="w-full h-full object-cover"
            source={require("../assets/images/placeholder.png")}
            alt={item.name}
          />
        )}
      </Link>
      <StyledView style={{ maxHeight: 40, overflow: "hidden" }}>
        <StyledText className="font-bold mt-2 text-center">
          {item.name}
        </StyledText>
      </StyledView>
      <StyledText className="text-base font-semibold mt-1">
        {formatPrice(item.price)}
      </StyledText>
      <StyledText className="text-base text-light-green font-semibold mt-1">
        {item.estimatedPreparationTime || "-"} min
      </StyledText>
    </StyledView>
  );

  return (
    <StyledView className="w-full">
      <Carousel
        layout="default"
        data={bestSellers || []}
        renderItem={renderOfferItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth / 1.8}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        slideStyle={{ paddingRight: 0, marginHorizontal: 0 }}
        vertical={false}
      />
    </StyledView>
  );
};

export default MainOffersSlider;
