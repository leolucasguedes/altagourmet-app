import api from '@/utils/api'
import { create } from 'zustand'

interface CartState {
    userCart: any[]
    fetchUserCart: (token: string) => Promise<void>
    totalItems: number,
    totalValue: number,
    addToCart: (token: string, id: string, quantity: number) => Promise<void>
    removeFromCart: (token: string, id: string, quantity?: number) => Promise<void>
    emptyCart: (token: string) => Promise<void>
}

const useCartStore = create<CartState>()((set, get) => ({
    userCart: [],
    fetchUserCart: async (token) => {
        try {
            const response = await api.get('/cart', { headers: { Authorization: 'Bearer ' + token } })
            set({ userCart: response.data })
            let totalItems = 0
            let totalValue = 0
            response.data.forEach((item: any) => {
                totalItems += item.quantity
                totalValue += item.product.price * item.quantity
            })
            set({ totalItems: totalItems, totalValue: totalValue })
        } catch (error) {
            console.log(error)
        }
    },
    totalItems: 0,
    totalValue: 0,
    addToCart: async (token, id, quantity) => {
        try {
            await api.post('/cart/add', { productId: id, quantity: quantity }, { headers: { Authorization: 'Bearer ' + token } })
            get().fetchUserCart(token)
        } catch (error) {
            console.log(error)
        }
    },
    removeFromCart: async (token, id, quantity?) => {
        try {
            if (quantity) {
                await api.post(`/cart/subtract`, { productId: id, quantity: quantity }, { headers: { Authorization: 'Bearer ' + token } })
            } else {
                await api.delete(`/cart/${id}`, { headers: { Authorization: 'Bearer ' + token } })
            }
            get().fetchUserCart(token)
        } catch (error) {
            console.log(error)
        }
    },
    emptyCart: async (token) => {
        try {
            await api.delete('/cart/delete/all', { headers: { Authorization: 'Bearer ' + token } })
            get().fetchUserCart(token)
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useCartStore