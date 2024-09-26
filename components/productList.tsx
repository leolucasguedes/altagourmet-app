import React from "react";
import { StyledView, StyledScrollView } from "./styleds/components";
import ProductCard from "./productCard";
import { Dimensions } from "react-native";

export default function ProductList({ products }: { products: any[] }) {
  const windowWidth = Dimensions.get("window").width;
  const numColumns = windowWidth < 768 ? 2 : windowWidth < 1024 ? 3 : 4;

  return (
    <StyledScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <StyledView
          key={product.id}
          style={{
            width: `${100 / numColumns - 4}%`,
            margin: "2%",
          }}
        >
          <ProductCard product={product} />
        </StyledView>
      ))}
    </StyledScrollView>
  );
}
