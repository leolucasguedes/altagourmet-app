import React, { useEffect, useState } from 'react';
import { StyledImage, StyledScrollView, StyledText, StyledView } from '../../../components/styleds/components';
import { ActivityIndicator, TouchableOpacity, Text, RefreshControl } from 'react-native';
import IconAnt from "react-native-vector-icons/AntDesign";
import { Link, useRouter } from 'expo-router';
import useCartStore from '../../../store/cartStore';
import useAuthStore from '../../../store/authStore';
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MIIcon from "react-native-vector-icons/MaterialIcons";
import api from '../../../utils/api';
import ProductCard from '../../../components/productCard';
import useHomeContentStore from '../../../store/homeContentStore';
import PlaceHolderImage from '../../../components/PlaceHolderImage';
import useShippingStore from '../../../store/shippingStore';

export default function OrdersPage() {
    const router = useRouter()
    const { emptyCart, addToCart, removeFromCart, userCart, fetchUserCart } = useCartStore()
    const { calculateShipping } = useShippingStore()
    const { homeData } = useHomeContentStore()
    const { token } = useAuthStore()
    const [loading, setLoading] = React.useState(false)
    const [buyMore, setBuyMore] = useState<any[]>([])
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        if (token) {
            fetchUserCart(token)
        }
        setRefreshing(false);
    }, []);

    const fetchMoreProducts = async () => {
        try {
            const prods = await api.get('/products/page/1/20', { headers: { Authorization: 'Bearer ' + token } })
            setBuyMore(prods.data.products)
        } catch (error) { console.log(error) }
    }
    useEffect(() => {
        if (token) {
            fetchMoreProducts()
        }
    }, [token])

    useEffect(() => {
        if (token && homeData.mainShops) {
            calculateShipping(token, homeData.mainShops[0].id)
        }
    }, [token, homeData])

    const changeQuantity = async (id: string, action: 'add' | 'remove') => {
        if (loading) return
        setLoading(true)
        if (action === 'add') {
            await addToCart(token || '', id, 1)
        } else {
            await removeFromCart(token || '', id, 1)
        }
        setLoading(false)
    }
    const cleanCart = async () => {
        if (loading) return
        setLoading(true)
        await emptyCart(token || '')
        setLoading(false)
    }
    return (
        <>
            <StyledView className='w-full flex flex-row items-center justify-between px-4 bg-white'>
                <TouchableOpacity style={{ width: '25%' }}><IconAnt name="arrowleft" size={25} color="#A3A3A3" onPress={() => router.back()} />
                </TouchableOpacity>
                <StyledText className='font-bold text-lg text-center'>Meu Carrinho</StyledText>
                <TouchableOpacity style={{ width: '25%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onPress={cleanCart}><StyledText className='text-dark-green'>Limpar</StyledText></TouchableOpacity>
            </StyledView>
            <StyledScrollView className="min-h-screen bg-white w-full" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '100%',
            }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <StyledView className='flex flex-col gap-y-2 px-4 w-full'>
                    <StyledView className='w-full pt-4 pb-2'>
                        {homeData.mainShops.length > 0 &&
                            <StyledView className='flex flex-row items-center justify-start w-full gap-2'>
                                <StyledView className='w-12 h-12 bg-light-green rounded-full'>
                                    <StyledImage className='w-full h-full' source={require('../../../assets/images/icone-farmacia.png')} />
                                </StyledView>
                                <StyledView>
                                    <StyledText className='font-bold text-lg'>{homeData.mainShops[0].name}</StyledText>
                                    <Link href={`/app/shop/${homeData.mainShops[0]?.id}`}><StyledText className='text-light-green pt-3'>Adicionar mais itens</StyledText></Link>
                                </StyledView>
                            </StyledView>
                        }
                    </StyledView>
                    {userCart && userCart.length === 0 && <StyledText className='w-full text-center'>Carrinho vazio</StyledText>}
                    {userCart && userCart.length > 0 && <StyledView>
                        {userCart?.map((item: any, key: number) => (
                            <StyledView key={key} className='w-full flex flex-row items-center justify-between'>
                                <StyledView className='flex flex-row items-center justify-between gap-3'>
                                    <StyledView className='p-1 w-14 h-14 rounded border-[1px] border-[#E8EDF2]'>
                                        {item.product.images ?
                                            <StyledImage className='w-full h-full' src={item.product.images} alt={item.product.name} />
                                            :
                                            <PlaceHolderImage category={'remedios'} />
                                        }
                                    </StyledView>
                                    <StyledView>
                                        <Text style={{ fontWeight: 'bold', width: '70%' }}>{item.product.name}</Text>
                                        <StyledText>R${item.product.price.replace('.', ',')}</StyledText>
                                    </StyledView>
                                </StyledView>
                                <StyledView className='flex flex-row items-center justify-between rounded border-[1px] gap-2 border-[#E8EDF2] bg-[#F8F8F8] pb-2'>
                                    <TouchableOpacity disabled={loading} style={{ paddingHorizontal: 5 }} onPress={() => { changeQuantity(item.product.id, 'remove') }}>
                                        <FAIcon name="minus" size={18} color="#5ECD81" style={{ width: 18, height: 18 }} />
                                    </TouchableOpacity>
                                    {loading ? <ActivityIndicator size={'small'} color={'#000'}></ActivityIndicator> : <StyledText className='font-bold'>{item.quantity}</StyledText>}
                                    <TouchableOpacity disabled={loading} style={{ paddingHorizontal: 5 }} onPress={() => { changeQuantity(item.product.id, 'add') }}>
                                        <FAIcon name="plus" size={18} color="#5ECD81" style={{ width: 18, height: 18 }} />
                                    </TouchableOpacity>
                                </StyledView>
                            </StyledView>
                        ))}
                    </StyledView>}
                    <StyledView className='w-full flex items-center justify-center'>
                        <Link href={'/app/home'}><StyledText className='text-light-green py-3'>Adicionar mais itens</StyledText></Link>
                    </StyledView>
                </StyledView>
                <StyledView className='w-full'>
                    <StyledView className="w-full flex px-4 py-3">
                        <StyledText className="font-bold my-4 text-xl">Peça Também</StyledText>
                        <StyledScrollView horizontal className="w-full">
                            {buyMore.length === 0 && <StyledView className="w-full flex items-center justify-center"><ActivityIndicator color={'#7a7a7a'} size={20} /></StyledView>}
                            {buyMore.length > 0 && buyMore.map((item, key) => (
                                <StyledView key={key} className='mx-2 w-40'>
                                    <ProductCard product={item} />
                                </StyledView>
                            ))}
                        </StyledScrollView>
                    </StyledView>
                    <StyledView className="w-full flex flex-row items-center justify-between px-4 mt-4 mb-48">
                        <StyledView className="flex flex-row items-center gap-3">
                            <MIIcon name="discount" size={25} color="#238878" style={{ transform: [{ scaleX: -1 }], width: 25, height: 25 }} />
                            <StyledView>
                                <StyledText className="text-lg font-bold text-black">Cupom</StyledText>
                                <StyledText className="text-xs text-gray">{8} disponíveis nessa loja</StyledText>
                            </StyledView>
                        </StyledView>
                        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StyledText className="text-lg font-bold text-dark-green">Adicionar</StyledText>
                        </TouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </>
    );
}