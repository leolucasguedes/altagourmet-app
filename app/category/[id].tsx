import React, { useEffect } from "react";
import { StyledText } from "../../components/styleds/components";
import { useLocalSearchParams } from "expo-router";
import {
  StyledView,
  StyledPressable,
  StyledImage,
} from "../../components/styleds/components";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter, Link } from "expo-router";
import useHomeContentStore from "../../store/homeContentStore";

export default function CategoryPage() {
  const { id } = useLocalSearchParams();
  const { fetchCategory, productsByCategory } = useHomeContentStore();
  const router = useRouter();

  useEffect(() => {
    if (productsByCategory.length === 0) {
      fetchCategory(id as string);
    }
  }, [id]);

  return (
    <>
      <StyledView className="flex flex-col items-center justify-start w-full p-2">
        <StyledView className="w-full flex flex-row items-center justify-start gap-x-3 px-2 py-4">
          <StyledPressable onPress={() => router.back()} className="min-w-16">
            <Icon name="arrow-back" size={25} color="#8B8B93" />
          </StyledPressable>
          {productsByCategory.length > 0 ? (
            <StyledText>Pratos da categoria!</StyledText>
          ) : (
            <StyledText>Produtos ainda não adicionados.</StyledText>
          )}
        </StyledView>
        <StyledView className="w-full flex flex-col items-start justify-start gap-y-3 mt-2 px-4">
          {productsByCategory.length > 0 ? (
            productsByCategory.map((product, index) => (
              <Link
                href={`/product/${product.id}`}
                key={index}
                className="rounded-lg p-2 flex flex-row w-full max-h-[80px] items-center"
              >
                <StyledView className="w-14 h-14 bg-light-green rounded-lg overflow-hidden flex-shrink-0">
                  {product.imageUrl && (
                    <StyledImage
                      className="w-full h-full object-cover"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  )}
                </StyledView>
                <StyledView className="pl-3 flex-1 flex flex-col justify-center max-w-[99%]">
                  <StyledText className="font-bold">{product.name}</StyledText>
                  <StyledText className="text-xs">
                    {product.description || "-"}
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
      </StyledView>
    </>
  );
}
