import React, { useEffect, useState } from "react";
import {
  StyledScrollView,
  StyledText,
  StyledView,
  StyledImage,
} from "../../components/styleds/components";
import { RefreshControl } from "react-native";
import { Link } from "expo-router";
import IconAnt from "react-native-vector-icons/AntDesign";
import useHomeContentStore from "../../store/homeContentStore";
import { useRouter } from "expo-router";

export default function OffersPage() {
  const router = useRouter();
  const { allOffers, fetchOffers } = useHomeContentStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOffers();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <StyledScrollView
      className="min-h-screen bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 80,
      }}
    >
      <StyledView className="w-full flex flex-row items-center px-6 mt-4">
        <IconAnt
          name="arrowleft"
          size={25}
          color="#A3A3A3"
          onPress={() => router.back()}
        />
        <StyledText className="ml-4 font-bold text-lg">
          Melhores Ofertas
        </StyledText>
      </StyledView>

      <StyledView className="w-full flex flex-col items-start justify-start gap-y-3 mt-2 px-4">
        {allOffers.length > 0 ? (
          allOffers.map((offer, index) => (
            <Link
              href={`/product/${offer.id}`}
              key={index}
              className="rounded-lg p-2 flex flex-row w-full max-h-[80px] items-center"
            >
              <StyledView className="w-14 h-14 bg-light-green rounded-lg overflow-hidden flex-shrink-0">
                {offer.imageUrl && (
                  <StyledImage
                    className="w-full h-full object-cover"
                    src={offer.imageUrl}
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
        ) : (
          <StyledText className="text-center mt-4">
            Nenhuma oferta disponível no momento.
          </StyledText>
        )}
      </StyledView>
    </StyledScrollView>
  );
}
