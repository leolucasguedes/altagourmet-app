import React, { useEffect, useState } from 'react';
import { StyledImage, StyledPressable, StyledScrollView, StyledText, StyledView } from '@/components/styleds/components';
import { Href, Link } from 'expo-router';
import FilterSelect from '@/components/filterSelect';
import useAuthStore from '@/store/authStore';
import { RefreshControl } from 'react-native';
import useHomeContentStore from '@/store/homeContentStore';
import CategoriesDisplay from '@/components/categories';

export default function HomePage() {
    const { homeData, fetchHomeData } = useHomeContentStore();
    const { token } = useAuthStore()
    useEffect(() => {
        if (token) {
            fetchHomeData(token);
        }
    }, [token])
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        if (token) {
            fetchHomeData(token);
        }
        setRefreshing(false);
    }, []);

    return (
        <>
            <StyledScrollView className="min-h-screen bg-white mb-20"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                <StyledImage source={require('@/assets/images/home-banner.png')} />
                <FilterSelect />
                <StyledText className='w-full text-start px-6 font-bold mb-2'>Categorias</StyledText>
                <CategoriesDisplay />
                {homeData.mainShops.length > 0 && <StyledView className='w-full flex flex-row items-center justify-between px-6'>
                    <StyledText className='text-start font-bold'>Principais Farmácias</StyledText>
                    <StyledPressable><StyledText className='text-light-green'>Ver mais</StyledText></StyledPressable>
                </StyledView>}
                <StyledView className='w-full flex flex-row items-center justify-start gap-3 mt-2 px-4'>
                    {homeData.mainShops.length > 0 ? homeData.mainShops.map((shop, index) => <Link href={`/app/shop/${shop.id}` as Href} key={index}><StyledView
                        className='rounded-lg border-[1px] border-gray p-2 flex flex-col'>
                        <StyledView className='w-12 h-12 bg-light-green rounded-lg' />
                        <StyledText className='font-bold'>{shop.name}</StyledText>
                        <StyledText>{shop.deliveryTime || '-'}</StyledText>
                    </StyledView></Link>) : null}
                </StyledView>
                {homeData.bestSellers.length > 0 && <StyledView className='w-full flex flex-row items-center justify-between px-6 mt-4'>
                    <StyledText className='text-start font-bold'>Mais Pedidos</StyledText>
                    <StyledPressable><StyledText className='text-light-green'>Ver mais</StyledText></StyledPressable>
                </StyledView>}
                <StyledView className='w-full flex flex-col items-start justify-start gap-3 mt-2 px-4'>
                    {homeData.bestSellers.length > 0 ? homeData.bestSellers.map((product, index) => <StyledView key={index}
                        className='rounded-lg border-[1px] border-gray p-2 flex flex-row w-full'>
                        {product.images ? <StyledImage className='w-12 h-12 rounded-lg' src={product.images?.replace('localhost', '10.0.2.2')} alt={product.name} /> :
                            <StyledView className='w-12 h-12 bg-light-green rounded-lg overflow-hidden'>
                            </StyledView>
                        }
                        <StyledView className='ml-3'>
                            <Link href={`/app/product/${product.id}` as Href}>
                                <StyledText className='font-bold'>{product.name}{'\n'}</StyledText>
                                <StyledText>{product.deliveryTime || '-'}</StyledText>
                            </Link>
                        </StyledView>
                    </StyledView>) : null}
                </StyledView>
                {homeData.bestDiscounts.length > 0 && <StyledView className='w-full flex flex-row items-center justify-between px-6 mt-4'>
                    <StyledText className='text-start font-bold'>Descontos Imperdíveis</StyledText>
                    <StyledPressable><StyledText className='text-light-green'>Ver mais</StyledText></StyledPressable>
                </StyledView>}
                <StyledView className='w-full flex flex-col items-start justify-start gap-3 mt-2 px-4'>
                    {homeData.bestDiscounts.length > 0 ? homeData.bestDiscounts.map((product, index) => <StyledView key={index}
                        className='rounded-lg border-[1px] border-gray p-2 flex flex-row w-full'>
                        {product.images ? <StyledImage className='w-12 h-12 rounded-lg' src={product.images?.replace('localhost', '10.0.2.2')} alt={product.name} /> :
                            <StyledView className='w-12 h-12 bg-light-green rounded-lg overflow-hidden'>
                            </StyledView>
                        }
                        <StyledView className='ml-3'>
                            <Link href={`/app/product/${product.id}` as Href}>
                                <StyledText className='font-bold'>{product.name}{'\n'}</StyledText>
                                <StyledText>{product.deliveryTime || '-'}</StyledText>
                            </Link>
                        </StyledView>
                    </StyledView>) : null}
                </StyledView>
                <StyledView className='mb-64'></StyledView>
            </StyledScrollView >
        </>
    );
}