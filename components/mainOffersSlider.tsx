import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
  StyledImage,
  StyledView,
  StyledText,
} from "../components/styleds/components";
import { Link } from "expo-router";
import useHomeContentStore from "../store/homeContentStore";

const { width: screenWidth } = Dimensions.get("window");

const MainOffersSlider = () => {
  const { fetchBestSellers, allBestSellers } = useHomeContentStore();

  useEffect(() => {
    if (allBestSellers.length === 0) {
      fetchBestSellers();
    }
  }, []);

  const renderOfferItem = ({ item }: any) => (
    <StyledView className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-2 mr-4 w-40">
      <Link
        href={`/product/${item.id}`}
        className="flex items-center justify-center overflow-hidden rounded-lg w-full h-32"
      >
        <StyledImage
          className="w-full h-full object-cover"
          src={item.imageUrl || "/placeholder.jpg"}
          alt={item.name}
        />
      </Link>
      <StyledText className="font-bold mt-2 text-center">
        {item.name}
      </StyledText>
      <StyledText className="text-xs text-center text-gray-600">
        {item.description || "-"}
      </StyledText>
      <StyledText className="text-base text-ascents font-semibold mt-1">
        R$ {item.price}
      </StyledText>
    </StyledView>
  );

  return (
    <StyledView className="w-full">
      <Carousel
        data={allBestSellers}
        renderItem={renderOfferItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.6}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.8}
        containerCustomStyle={{ marginTop: 10 }}
        contentContainerCustomStyle={{ paddingLeft: 16 }}
      />
    </StyledView>
  );
};

export default MainOffersSlider;
