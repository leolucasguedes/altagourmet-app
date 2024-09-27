import BigText from '@/components/bigText';
import ProductCard from '@/components/productCard';
import { StyledImage, StyledScrollView, StyledText, StyledView } from '@/components/styleds/components';
import useAuthStore from '@/store/authStore';
import useCartStore from '@/store/cartStore';
import useHomeContentStore from '@/store/homeContentStore';
import api from '@/utils/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import IconAnt from "react-native-vector-icons/AntDesign";

export default function ProductPage() {
    const { id } = useLocalSearchParams();
    const [productDetails, setProductDetails] = useState<any>(null);
    const [refreshing, setRefreshing] = useState(false);
    const { token } = useAuthStore()
    const { addToCart } = useCartStore()
    const [seeMore, setSeeMore] = useState<any>(null)
    const { homeData } = useHomeContentStore()
    const loadSeeMore = async () => {
        if (homeData) {
            setSeeMore(homeData.bestSellers)
        } else {
            try {
                const response = await api.get("/products/page/1/4", { headers: { Authorization: 'Bearer ' + token } });
                setSeeMore(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const fetchProduct = async () => {
        try {
            const prod = await api.get(`/products/details/${id}`, { headers: { Authorization: 'Bearer ' + token } });
            setProductDetails(prod.data);
        } catch (error) {
            console.log(error)
        }
    }
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchProduct()
        setRefreshing(false);
    }, []);
    useEffect(() => {
        if (id && token) {
            fetchProduct();
            loadSeeMore()
        }
    }, [id, token])
    const router = useRouter()
    return (
        <StyledScrollView className="min-h-screen bg-white mb-20 w-full"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
            {productDetails ?
                <StyledView className='w-full px-4 py-4'>
                    <StyledView className="w-full flex flex-col rounded-3xl border-2 border-[#E8EDF2] p-2">
                        <StyledView className='flex flex-row items-center justify-start gap-2'>
                            <IconAnt name="arrowleft" size={25} color="#A3A3A3" onPress={() => router.back()} />
                        </StyledView>
                        <StyledView className='w-full h-fit flex items-center justify-center'>
                            {productDetails.images ?
                                <StyledImage className='w-2/3 h-52' src={productDetails.images} alt={productDetails.name} />
                                :
                                <StyledImage className='w-12 h-12' source={require('@/assets/images/medicine.png')} alt={productDetails.name} />
                            }
                        </StyledView>
                    </StyledView>
                    <StyledText className='text-xl mt-4 font-bold'>{`${productDetails.name}`}</StyledText>
                    <StyledView>
                        <StyledText className='font-bold text-light-green text-3xl'>{`R$${productDetails.price.replace('.', ',')}`}</StyledText>
                        {/*resolver o desconto aqui {productDetails.showDiscount && <StyledText className='text-red-600'>{`${productDetails.price}`}</StyledText>} */}
                    </StyledView>
                    <TouchableOpacity onPress={() => { addToCart(token || '', productDetails.id, 1) }}>
                        <StyledView className='bg-[#5ECD81] rounded-md py-4 mt-4 w-full flex justify-center items-center'>
                            <StyledText className='text-white'>Adicionar à Sacola</StyledText>
                        </StyledView>
                    </TouchableOpacity>
                    <StyledView className='flex flex-row items-center justify-between pt-3 gap-4'>
                        <TouchableOpacity style={{ width: '26%' }} onPress={() => { addToCart(token || '', productDetails.id, 2) }}>
                            <StyledView className='border-[1px] border-[#8B8B93] rounded-md py-2 px-4 w-full flex items-center justify-center'><StyledText className='text-[#8B8B93]'>+2</StyledText></StyledView>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '26%' }} onPress={() => { addToCart(token || '', productDetails.id, 5) }}>
                            <StyledView className='border-[1px] border-[#8B8B93] rounded-md py-2 px-4 w-full flex items-center justify-center'><StyledText className='text-[#8B8B93]'>+5</StyledText></StyledView>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '26%' }} onPress={() => { addToCart(token || '', productDetails.id, 10) }}>
                            <StyledView className='border-[1px] border-[#8B8B93] rounded-md py-2 px-4 w-full flex items-center justify-center'><StyledText className='text-[#8B8B93]'>+10</StyledText></StyledView>
                        </TouchableOpacity>
                    </StyledView>
                    <StyledText className='font-bold text-lg mb-3 mt-4'>Descrição do Produto</StyledText>
                    <BigText limit={180} text={productDetails.description} />
                </StyledView>
                :
                <StyledView className='w-full h-screen fixed flex items-center justify-center bg-white'>
                    <ActivityIndicator size="large" color="#6c6c6c" />
                </StyledView>}
            {seeMore && seeMore.length > 0 &&
                <StyledView className='px-4 w-full pb-40'>
                    <StyledText className='my-4 w-full text-start font-bold text-lg'>Veja Mais</StyledText>
                    <StyledScrollView horizontal className='gap-2'>
                        {seeMore.map((item: any, key: number) => (
                            <StyledView key={key} className='mx-2 w-36'>
                                <ProductCard product={item} />
                            </StyledView>
                        ))}
                    </StyledScrollView>
                </StyledView>
            }
        </StyledScrollView>
    )
}