import React, { useEffect, useState } from "react";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "../components/styleds/components";
import { Href, Link, useRouter } from "expo-router";
import useAuthStore from "../store/authStore";
import { RefreshControl } from "react-native";
import useHomeContentStore from "../store/homeContentStore";
import CategoriesDisplay from "../components/Categories";

export default function HomePage() {
  const { homeData, fetchHomeData } = useHomeContentStore();
  const [refreshing, setRefreshing] = useState(false);
  const { token, logout } = useAuthStore();
  const router = useRouter();
  const homeFetch = async () => {
    if (token) {
      return;
    }
    const data = await fetchHomeData(80);
    if (!data) {
      console.log("Error fetching home data");
    }
  };
  useEffect(() => {
    if (token) {
      homeFetch();
    }
  }, [token]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (token) {
      homeFetch();
    }
    setRefreshing(false);
  }, []);

  return (
    <>
      <StyledScrollView
        className="min-h-screen bg-white mb-20"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <StyledImage
          source={require("../../../assets/images/home-banner.png")}
        />
        <StyledText className="w-full text-start px-6 font-bold mt-4 mb-2">
          Categorias
        </StyledText>
        <CategoriesDisplay />
        {!refreshing && homeData.mainShops.length > 0 && (
          <StyledView className="w-full flex flex-row items-center justify-between px-6">
            <StyledText className="text-start font-bold">
              Principais Farmácias
            </StyledText>
            <Link href={"/app/shops" as Href}>
              <StyledText className="text-light-green">Ver mais</StyledText>
            </Link>
          </StyledView>
        )}
        <StyledView className="w-full flex flex-row items-center justify-start gap-3 mt-2 px-4">
          {homeData.mainShops.length > 0
            ? homeData.mainShops.map((shop, index) => (
                <Link href={`/app/shop/${shop.id}` as Href} key={index}>
                  <StyledView className="rounded-lg border-[1px] border-gray p-2 flex flex-col">
                    <StyledView className="w-12 h-12 bg-light-green rounded-full">
                      <StyledImage
                        className="w-full h-full"
                        source={require("../../../assets/images/icone-farmacia.png")}
                      />
                    </StyledView>
                    <StyledText className="font-bold">{shop.name}</StyledText>
                    <StyledText>{shop.deliveryTime || "-"}</StyledText>
                  </StyledView>
                </Link>
              ))
            : null}
        </StyledView>
        {!refreshing && homeData.bestSellers.length > 0 && (
          <StyledView className="w-full flex flex-row items-center justify-between px-6 mt-4">
            <StyledText className="text-start font-bold">
              Mais Pedidos
            </StyledText>
            <Link href={"/app/products/?order=popular" as Href}>
              <StyledText className="text-light-green">Ver mais</StyledText>
            </Link>
          </StyledView>
        )}
        <StyledView className="w-full flex flex-col items-start justify-start gap-3 mt-2 px-4">
          {!refreshing && homeData.bestSellers.length > 0
            ? homeData.bestSellers.map((product, index) => (
                <Link
                  href={`/app/product/${product.id}` as Href}
                  key={index}
                  className="rounded-lg border-[1px] border-gray p-2 flex flex-row w-full items-center"
                >
                  <StyledView className="w-12 h-12 bg-light-green rounded-lg overflow-hidden flex items-center justify-center">
                    {product.images && (
                      <StyledImage
                        className="w-12 h-12"
                        src={product.images}
                        alt={product.name}
                      />
                    )}
                  </StyledView>
                  <StyledView className="pl-3">
                    <StyledText className="font-bold">
                      {product.name}
                    </StyledText>
                    <StyledText>{product.deliveryTime || "-"}</StyledText>
                  </StyledView>
                </Link>
              ))
            : null}
        </StyledView>
        {homeData.bestDiscounts.length > 0 && (
          <StyledView className="w-full flex flex-row items-center justify-between px-6 mt-4">
            <StyledText className="text-start font-bold">
              Descontos Imperdíveis
            </StyledText>
            <Link href={"/app/products/?order=discount" as Href}>
              <StyledText className="text-light-green">Ver mais</StyledText>
            </Link>
          </StyledView>
        )}
        <StyledView className="w-full flex flex-col items-start justify-start gap-3 mt-2 px-4">
          {homeData.bestDiscounts.length > 0
            ? homeData.bestDiscounts.map((product, index) => (
                <StyledView
                  key={index}
                  className="rounded-lg border-[1px] border-gray p-2 flex flex-row w-full"
                >
                  {product.images ? (
                    <StyledImage
                      className="w-12 h-12 rounded-lg"
                      src={product.images?.replace("localhost", "10.0.2.2")}
                      alt={product.name}
                    />
                  ) : (
                    <StyledView className="w-12 h-12 bg-light-green rounded-lg overflow-hidden"></StyledView>
                  )}
                  <StyledView className="ml-3">
                    <Link href={`/app/product/${product.id}` as Href}>
                      <StyledText className="font-bold">
                        {product.name}
                        {"\n"}
                      </StyledText>
                      <StyledText>{product.deliveryTime || "-"}</StyledText>
                    </Link>
                  </StyledView>
                </StyledView>
              ))
            : null}
        </StyledView>
        <StyledView className="mb-72"></StyledView>
      </StyledScrollView>
    </>
  );
}
