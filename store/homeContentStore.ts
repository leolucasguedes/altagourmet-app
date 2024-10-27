import api from "../utils/api";
import { create } from "zustand";
export interface IMainData {
  offers: any[];
  bestSellers: any[];
  products: any[];
}
interface HomeContent {
  homeData: IMainData;
  setHomeData: (value: IMainData) => void;
  fetchHomeData: () => Promise<boolean>;
  productsByCategory: any[];
  allOffers: any[];
  allBestSellers: any[];
  categories: any[];
  complements: any[];
  getAllCategories: () => Promise<boolean>;
  fetchCategory: (id: number | string) => Promise<boolean>;
  fetchOffers: () => Promise<boolean>;
  fetchComplements: () => Promise<boolean>;
  fetchBestSellers: () => Promise<boolean>;
  setCategories: (value: any) => void;
  setComplements: (value: any) => void;
  setProductsByCategory: (value: any) => void;
  setOffers: (value: any) => void;
  setBestSellers: (value: any) => void;
}

const useHomeContentStore = create<HomeContent>()((set, get) => ({
  homeData: {
    offers: [],
    bestSellers: [],
    products: [],
  },
  categories: [],
  complements: [],
  productsByCategory: [],
  allBestSellers: [],
  allOffers: [],
  setOffers: (value) => set({ allOffers: value }),
  setBestSellers: (value) => set({ allBestSellers: value }),
  setProductsByCategory: (value) => set({ productsByCategory: value }),
  setComplements: (value) => set({ complements: value }),
  setCategories: (value) => set({ categories: value }),
  getAllCategories: async () => {
    try {
      const res = await api.get("/categories");

      if (res.status === 200) {
        get().setCategories(res.data);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  fetchCategory: async (categoryId) => {
    try {
      const res = await api.get(`/products/category/${categoryId}`);

      if (res.status === 200) {
        get().setProductsByCategory(res.data);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  fetchOffers: async () => {
    try {
      const res = await api.get("/offers");

      if (res.status === 200) {
        get().setOffers(res.data);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  fetchBestSellers: async () => {
    try {
      const res = await api.get("/popular");

      if (res.status === 200) {
        get().setBestSellers(res.data);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  fetchComplements: async () => {
    try {
      const res = await api.get("/complements");

      if (res.status === 200) {
        get().setComplements(res.data);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  setHomeData: (value) => set({ homeData: value }),
  fetchHomeData: async () => {
    try {
      const res = await api.get("/home");

      if (res.status === 200) {
        get().setHomeData(res.data);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
}));

export default useHomeContentStore;
