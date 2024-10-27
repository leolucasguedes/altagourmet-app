import api from "../utils/api";
import { create } from "zustand";

interface OrderContent {
  userOrders: any[];
  fetchUserOrders: (userId: string | number) => Promise<boolean>;
  setUserOrders: (value: any[]) => void;
}

const useOrderContentStore = create<OrderContent>()((set, get) => ({
  userOrders: [],
  setUserOrders: (value) => set({ userOrders: value }),
  fetchUserOrders: async (userId) => {
    try {
      const res = await api.get(`/order/user/${userId}`);
      if (res.status === 200) {
        get().setUserOrders(res.data);
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
}));

export default useOrderContentStore;
