import { useRouter } from "expo-router";
import { StyledImage, StyledText, StyledView } from "./styleds/components";
import { TouchableOpacity } from "react-native";
export default function ProductCard({ product }: { product: any }) {
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => router.push(`/product/${product.id}`)}>
            <StyledView className="rounded-xl border-[1px] border-[#E8EDF2] px-4 flex items-center justify-between py-3 min-h-[200px]">
                <StyledView className="w-full flex-1">
                    <StyledView className="flex items-center justify-center">
                        {product.images ?
                            <StyledImage className='w-20 h-20' src={product.images} alt={product.name} />
                            :
                            <StyledImage className='w-20 h-20 object-contain' source={require('../assets/images/placeholder.png')} alt={product.name} />
                        }
                        <StyledText>{JSON.stringify(product.category)}</StyledText>
                    </StyledView>
                    <StyledText className="text-center font-bold">{product.name.substring(0, 30)}</StyledText>
                </StyledView>
                <StyledView className="w-full flex-1">
                    <StyledText className="text-center text-xs">à partir de</StyledText>
                    <StyledText className="text-center font-bold text-light-green text-lg">R${product.price.replace('.', ',')}</StyledText>
                </StyledView>
            </StyledView>
        </TouchableOpacity>
    )
}