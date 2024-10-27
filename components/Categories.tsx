import { Href, useRouter } from "expo-router";
import {
  StyledImage,
  StyledPressable,
  StyledText,
  StyledView,
} from "./styleds/components";

const categories = [
  {
    id: 1,
    name: "Categoria1",
    image: require("../assets/images/categoria.jpg"),
  },
  {
    id: 2,
    name: "Categoria2",
    image: require("../assets/images/categoria.jpg"),
  },
  {
    id: 3,
    name: "Categoria3",
    image: require("../assets/images/categoria.jpg"),
  },
  {
    id: 4,
    name: "Categoria4",
    image: require("../assets/images/categoria.jpg"),
  },
  {
    id: 5,
    name: "Categoria5",
    image: require("../assets/images/categoria.jpg"),
  },
  {
    id: 6,
    name: "Categoria6",
    image: require("../assets/images/categoria.jpg"),
  },
  {
    id: 7,
    name: "Categoria7",
    image: require("../assets/images/categoria.jpg"),
  },
  {
    id: 8,
    name: "Categoria8",
    image: require("../assets/images/categoria.jpg"),
  },
];
export default function CategoriesDisplay() {
  const router = useRouter();
  return (
    <StyledView className="px-4 flex flex-row flex-wrap w-full">
      {categories.map((category) => (
        <StyledPressable
          key={category.id}
          className="w-1/4 p-2"
          onPress={() =>
            router.push(`/category/${category.id}` as Href)
          }
        >
          <StyledImage source={category.image} className="w-16 h-16" />
          <StyledText className="text-center text-xs text-nowrap mt-1">{`${category.name}`}</StyledText>
        </StyledPressable>
      ))}
    </StyledView>
  );
}
