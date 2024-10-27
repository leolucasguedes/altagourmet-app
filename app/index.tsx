import React, { useEffect, useState } from "react";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "../components/styleds/components";
import { Href, Link } from "expo-router";
import useAuthStore from "../store/authStore";
import { RefreshControl } from "react-native";
import useHomeContentStore from "../store/homeContentStore";
import CategoriesDisplay from "../components/Categories";
import MainOffersSlider from "../components/mainOffersSlider";

export default function HomePage() {
  const { homeData, fetchHomeData } = useHomeContentStore();
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuthStore();

  const homeFetch = async () => {
    const data = await fetchHomeData();
    if (!data) {
      console.log("Error fetching home data");
    }
  };

  useEffect(() => {
    if (!homeData) {
      fetchHomeData();
    }
  }, [token]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    homeFetch();

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
        <StyledView className="w-[350px] h-[200px] flex items-center justify-center border border-[#E8EDF2] mt-4">
          <StyledText className="text-start font-bold">
            Vídeo/Foto de apresentação
          </StyledText>
        </StyledView>
        <StyledText className="w-full text-start px-6 font-bold mt-4 mb-2">
          Categorias
        </StyledText>
        <CategoriesDisplay />
        {!refreshing && homeData.offers.length > 0 && (
          <StyledView className="w-full flex flex-row items-center justify-between px-6">
            <StyledText className="text-start font-bold">
              Principais Ofertas
            </StyledText>
            <Link href={"/offers" as Href}>
              <StyledText className="text-light-green">Ver mais</StyledText>
            </Link>
          </StyledView>
        )}
        <StyledView className="w-full flex flex-row items-center justify-start gap-3 mt-2 px-4">
          {!refreshing && homeData.offers.length > 0
            ? homeData.offers.map((offer, index) => (
                <Link
                  href={`/product/${offer.id}` as Href}
                  key={index}
                  className="rounded-lg p-2 flex flex-row w-full max-h-[80px] items-center"
                >
                  <StyledView className="w-14 h-14 bg-light-green rounded-lg overflow-hidden flex-shrink-0">
                    {offer.imageUrl && (
                      <StyledImage
                        className="w-full h-full object-cover"
                        src={offer.images}
                        alt={offer.name}
                      />
                    )}
                  </StyledView>
                  <StyledView className="pl-3 flex-1 flex flex-col justify-center max-w-[99%]">
                    <StyledText className="font-bold">{offer.name}</StyledText>
                    <StyledText className="text-xs">
                      {offer.description || "-"}
                    </StyledText>
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
            <Link href={"/trends" as Href}>
              <StyledText className="text-light-green">Ver mais</StyledText>
            </Link>
          </StyledView>
        )}
        <StyledView className="w-full flex flex-col items-start justify-start gap-y-3 mt-2 px-4">
          {!refreshing && homeData.bestSellers.length > 0
            ? homeData.bestSellers.map((product, index) => (
                <Link
                  href={`/product/${product.id}` as Href}
                  key={index}
                  className="rounded-lg p-2 flex flex-row w-full max-h-[80px] items-center"
                >
                  <StyledView className="w-14 h-14 bg-light-green rounded-lg overflow-hidden flex-shrink-0">
                    {product.imageUrl && (
                      <StyledImage
                        className="w-full h-full object-cover"
                        src={product.images}
                        alt={product.name}
                      />
                    )}
                  </StyledView>
                  <StyledView className="pl-3 flex-1 flex flex-col justify-center max-w-[99%]">
                    <StyledText className="font-bold">
                      {product.name}
                    </StyledText>
                    <StyledText className="text-xs">
                      {product.description || "-"}
                    </StyledText>
                  </StyledView>
                </Link>
              ))
            : null}
        </StyledView>
        <StyledView className="w-full flex flex-col items-start justify-start gap-y-3 mt-2 px-4">
          {homeData.products.length > 0
            ? homeData.products.map((category, index) => (
                <StyledView key={index} className="w-full">
                  <StyledText className="font-bold text-lg mb-2">
                    {category.name}
                  </StyledText>
                  {category.foods.map((product: any, productIndex: any) => (
                    <StyledView
                      key={productIndex}
                      className="rounded-lg border-t-[1px] border-gray p-2 flex flex-row items-center w-full"
                    >
                      {product.imageUrl ? (
                        <StyledImage
                          className="w-14 h-14 rounded-lg"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                      ) : (
                        <StyledView className="w-14 h-14 bg-light-green rounded-lg overflow-hidden"></StyledView>
                      )}
                      <StyledView className="ml-3">
                        <Link
                          href={`/product/${product.id}` as Href}
                          className="max-w-[95%]"
                        >
                          <StyledText className="font-bold">
                            {product.name}
                            {"\n"}
                          </StyledText>
                          <StyledText className="text-xs">
                            {product.description || "-"}
                            {"\n"}
                          </StyledText>
                          <StyledText>R${product.price || "-"} -</StyledText>
                          <StyledText>
                            {" "}
                            {product.estimatedPreparationTime || "-"} min
                          </StyledText>
                        </Link>
                      </StyledView>
                    </StyledView>
                  ))}
                </StyledView>
              ))
            : null}
        </StyledView>
        <StyledView className="mb-72"></StyledView>
      </StyledScrollView>
    </>
  );
}
