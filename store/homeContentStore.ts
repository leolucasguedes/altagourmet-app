import api from '../utils/api';
import { create } from 'zustand'
export interface IMainData {
    bestSellers: any[],
    bestDiscounts: any[],
    mainShops: any[]
}
interface HomeContent {
    homeData: IMainData,
    setHomeData: (value: IMainData) => void,
    fetchHomeData: (quantity?: number) => Promise<boolean>
}

const useHomeContentStore = create<HomeContent>()((set, get) => ({
    homeData: {
        bestSellers: [],
        bestDiscounts: [],
        mainShops: []
    },
    setHomeData: (value) => set({ homeData: value }),
    fetchHomeData: async (quantity?: number) => {
        try {
            const res = await api.get(`/products/home/${quantity || 4}`);
            if (res.status === 200) {
                get().setHomeData(res.data);
            }
            return true
        } catch (err) {
            console.log(err)
            return false
        }

    }
}))

export default useHomeContentStore