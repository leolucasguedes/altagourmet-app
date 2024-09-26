import { Href, useRouter } from "expo-router";
import { StyledImage, StyledPressable, StyledText, StyledView } from "./styleds/components";

const categories = [
    {
        id: 1,
        name: "Remédios",
        image: require("../assets/images/remedios.png")
    },
    {
        id: 2,
        name: 'Testes',
        image: require("../assets/images/testes.png")
    },
    {
        id: 3,
        name: 'Cosméticos',
        image: require("../assets/images/cosmeticos.png")
    },
    {
        id: 4,
        name: 'Beleza',
        image: require("../assets/images/beleza.png")
    },
    {
        id: 5,
        name: 'Primeiros Socorros',
        image: require("../assets/images/primeiros-socorros.png")
    },
    {
        id: 6,
        name: 'Higiene Pessoal',
        image: require("../assets/images/higiene-pessoal.png")
    },
    {
        id: 7,
        name: 'Cuidados Infantis',
        image: require("../assets/images/cuidados-infantis.png")
    },
    {
        id: 8,
        name: 'Mercearia',
        image: require("../assets/images/mercearia.png")
    }
]
export default function CategoriesDisplay() {
    const router = useRouter()
    return (
        <StyledView className="px-4 flex flex-row flex-wrap w-full">
            {categories.map((category) => (
                <StyledPressable
                    key={category.id}
                    className="w-1/4 p-2"
                    onPress={() => router.push(`/app/category/${category.name.toLowerCase()}` as Href)}
                >
                    <StyledImage source={category.image} />
                    <StyledText className="text-center text-xs text-nowrap mt-1">{`${category.name}`}</StyledText>
                </StyledPressable>
            ))}
        </StyledView>
    )
}