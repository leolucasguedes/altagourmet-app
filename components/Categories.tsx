import { Href, useRouter } from "expo-router";
import { StyledImage, StyledPressable, StyledText, StyledView } from "./styleds/components";

export default function CategoriesDisplay() {
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
    const router = useRouter()
    return (
        <StyledView className="flex flex-row flex-wrap px-4">
            {categories.map((category) => (
                <StyledPressable
                    key={category.id}
                    className="w-1/4 p-2"
                    onPress={() => router.push(`/app/category/${category.name.toLowerCase()}` as Href)}
                >
                    <StyledImage source={category.image} />
                    <StyledText className="text-center">{category.name}</StyledText>
                </StyledPressable>
            ))}
        </StyledView>
    )
}