import api from '@/utils/api';
import { create } from 'zustand'
export interface IMainData {
    bestSellers: any[],
    bestDiscounts: any[],
    mainShops: any[]
}
interface HomeContent {
    homeData: IMainData,
    setHomeData: (value: IMainData) => void,
    fetchHomeData: (token: string, quantity?: number) => void
}

const useHomeContentStore = create<HomeContent>()((set, get) => ({
    homeData: {
        bestSellers: [],
        bestDiscounts: [],
        mainShops: []
    },
    setHomeData: (value) => set({ homeData: value }),
    fetchHomeData: async (token: string, quantity?: number) => {
        try {
            const res = await api.get(`/products/home/${quantity || 4}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (res.status === 200) {
                get().setHomeData(res.data);
            }
        } catch (err) {
            console.log(err)
        }

    }
}))

export default useHomeContentStore