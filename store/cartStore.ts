import { create } from 'zustand'

interface CartState {
    userCart: any[]
    setUserCart: (value: any[]) => void
    total: number
    totalItems: number
    setTotal: (value: number) => void
    setTotalItems: (value: number) => void
    addToCart: (value: any) => void
    removeFromCart: (value: any) => void
    emptyCart: () => void
}

export const useCartStore = create<CartState>()((set) => ({
    userCart: [],
    setUserCart: (value) => set({ userCart: value }),
    total: 0,
    totalItems: 0,
    setTotal: (value) => set({ total: value }),
    setTotalItems: (value) => set({ totalItems: value }),
    addToCart: (value) => set((state) => ({ userCart: [...state.userCart, value] })),
    removeFromCart: (value) => set((state) => ({ userCart: state.userCart.filter((item) => item.id !== value) })),
    emptyCart: () => set({ userCart: [], total: 0, totalItems: 0 }),
}))