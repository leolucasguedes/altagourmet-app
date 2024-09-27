import React from 'react';
import { StyledImage, StyledScrollView, StyledText, StyledView } from '@/components/styleds/components';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import IconAnt from "react-native-vector-icons/AntDesign";
import { Link, useRouter } from 'expo-router';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';

export default function OrdersPage() {
    const router = useRouter()
    const { emptyCart, addToCart, removeFromCart, userCart } = useCartStore()
    const { token } = useAuthStore()
    const [loading, setLoading] = React.useState(false)
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
            <StyledScrollView className="min-h-screen bg-white" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <StyledView className='w-full flex flex-row items-center justify-between px-4'>
                    <TouchableOpacity style={{ width: '25%' }}><IconAnt name="arrowleft" size={25} color="#A3A3A3" onPress={() => router.back()} />
                    </TouchableOpacity>
                    <StyledText className='font-bold text-lg text-center'>Meu Carrinho</StyledText>
                    <TouchableOpacity style={{ width: '25%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onPress={cleanCart}><StyledText className='text-dark-green'>Limpar</StyledText></TouchableOpacity>
                </StyledView>
                <StyledView className='py-4'></StyledView>
                <StyledView className='flex flex-col gap-5 px-4'>
                    {userCart && userCart.length === 0 && <StyledText>Carrinho vazio</StyledText>}
                    {userCart && userCart.length > 0 && <StyledView>
                        {userCart?.map((item: any, key: number) => (
                            <StyledView key={key} className='w-full flex flex-row items-center justify-between'>
                                <StyledView className='flex flex-row items-center justify-between gap-3'>
                                    <StyledView className='p-1 w-14 h-14 rounded border-[1px] border-[#E8EDF2]'>
                                        {item.product.images ?
                                            <StyledImage className='w-12 h-12' src={item.product.images} alt={item.product.name} />
                                            :
                                            <StyledImage className='w-12 h-12' source={require('@/assets/images/medicine.png')} alt={item.product.name} />
                                        }
                                    </StyledView>
                                    <StyledView>
                                        <Text style={{ fontWeight: 'bold', width: '70%' }}>{item.product.name}</Text>
                                        <StyledText>R${item.product.price.replace('.', ',')}</StyledText>
                                    </StyledView>
                                </StyledView>
                                <StyledView className='flex flex-row items-center justify-between rounded border-[1px] gap-2 border-[#E8EDF2] bg-[#F8F8F8]'>
                                    <TouchableOpacity disabled={loading} style={{ paddingHorizontal: 5, paddingBottom: 5 }} onPress={() => { changeQuantity(item.product.id, 'remove') }}><StyledText className='text-light-green font-bold text-xl'>-</StyledText></TouchableOpacity>
                                    {loading ? <ActivityIndicator size={'small'} color={'#000'}></ActivityIndicator> : <StyledText>{item.quantity}</StyledText>}
                                    <TouchableOpacity disabled={loading} style={{ paddingHorizontal: 5, paddingBottom: 5 }} onPress={() => { changeQuantity(item.product.id, 'add') }}><StyledText className='text-light-green font-bold text-xl'>+</StyledText></TouchableOpacity>
                                </StyledView>
                            </StyledView>
                        ))}
                    </StyledView>}
                </StyledView>
                <Link href={'/app/home'}><StyledText className='text-light-green py-3'>Adicionar mais itens</StyledText></Link>
            </StyledScrollView>
        </>
    );
}