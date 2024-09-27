import { useRouter } from "expo-router";
import { StyledImage, StyledText, StyledView } from "./styleds/components";
import { TouchableOpacity } from "react-native";

export default function ProductCard({ product }: { product: any }) {
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => router.push(`/app/product/${product.id}`)}>
            <StyledView className="rounded-xl border-[1px] border-[#E8EDF2] px-4 py-4">
                <StyledView className="flex items-center justify-center">
                    {product.images ?
                        <StyledImage className='w-20 h-20' src={product.images} alt={product.name} />
                        :
                        <StyledImage className='w-20 h-20 object-contain' source={require('@/assets/images/remedios.png')} alt={product.name} />
                    }
                </StyledView>
                <StyledText className="text-center font-semibold">{product.name}</StyledText>
                <StyledText className="text-center text-xs">à partir de</StyledText>
                <StyledText className="text-center font-bold text-light-green text-lg">R${product.price.replace('.', ',')}</StyledText>
            </StyledView>
        </TouchableOpacity>
    )
}