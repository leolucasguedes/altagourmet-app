import api from "../utils/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import zustandStorage from "../utils/zustandStorage";

export interface Filters {
  name?: string[];
  brand?: string[];
  category?: string[];
  price?: { start: string; end: string };
  subcategory?: string[];
  size?: string[];
  user_id?: string[];
  search?: string;
}
interface SearchState {
  searchTerm: string;
  setSearchTerm: (termo: string) => void;
  filters: Filters;
  results: any[];
  setFilter: (filter: string, value: any) => void;
  clearFilters: () => void;
  searchForResults: (token: string, term?: string) => Promise<any>;
  searchByCategory: (token: string, category: string) => Promise<any>;
  searchByBrand: (token: string, brand: string) => Promise<any>;
  searchBySubcategory: (token: string, subcategory: string) => Promise<any>;
  brands: any[];
  categories: any[];
  subcategories: any[];
  loadOptions: (token: string) => Promise<void>;
  clearResults: () => void;
  history: string[];
  addHistory: (item: string) => void;
  removeHistory: (item: string) => void;
  clearHistory: () => void;
  loading: boolean;
  initialFilter: string | null;
  setInitialFilter: (filter: string) => void;
  clearInitialFilter: () => void;
  sortingOrder: string;
  setSortingOrder: (order: string) => void;
}

const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      loading: false,
      sortingOrder: "name",
      searchTerm: "",
      setSearchTerm: (term) => {
        set((state) => {
          const newFilters = { ...state.filters, search: term };
          return { searchTerm: term, filters: newFilters };
        });
      },
      filters: {},
      results: [],
      setFilter: (filter: string, value: any) => {
        set((state) => ({ filters: { ...state.filters, [filter]: value } }));
      },
      clearFilters: () => {
        set(() => ({ filters: {} }));
      },
      setSortingOrder: (order) => {
        set(() => ({ sortingOrder: order }));
        const { results } = get();
        let sortedResults = [...results];
        switch (order) {
          case "price_asc":
            sortedResults.sort((a, b) => a.price - b.price);
            break;
          case "price_desc":
            sortedResults.sort((a, b) => b.price - a.price);
            break;
          case "name":
            sortedResults.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "category":
            sortedResults.sort((a, b) => a.category.localeCompare(b.category));
            break;
          case "brand":
            sortedResults.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
        }
        set({ results: sortedResults });
      },
      searchForResults: async (token, term?) => {
        set(() => ({ loading: true }));
        const filters = get().filters;
        let hasResults = false;

        try {
          const searchPayload: {
            search?: string;
            brand?: string[];
            category?: string[];
            subcategory?: string[];
            price?: { start: string; end: string };
            user_id?: string[];
          } = { search: term || "" };

          if (filters) {
            searchPayload.brand = filters.brand;
            searchPayload.category = filters.category;
            searchPayload.subcategory = filters.subcategory;
            searchPayload.price = filters.price
              ? {
                  start: filters.price.start || "0",
                  end: filters.price.end || String(Number.MAX_SAFE_INTEGER),
                }
              : undefined;
            searchPayload.user_id = filters.user_id;
          }

          const response: any = await api.get(
            `/products/search/${term || ""}/1/50`,
            {
              headers: { Authorization: `Bearer ${token}` },
              params: searchPayload,
            }
          );

          if (
            response.data &&
            response.data.products &&
            response.data.products.length > 0
          ) {
            set({ results: response.data.products });
            hasResults = true;
          } else {
            set({ results: [] });
          }
        } catch (err) {
          console.error("Erro ao buscar resultados:", err);
        }

        set(() => ({ loading: false }));
        return hasResults;
      },
      searchByCategory: async (token, category) => {
        set(() => ({ loading: true }));
        try {
          const response = await api.get(`/products/categories`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { category },
          });
          set({ results: response.data.products });
        } catch (err) {
          console.error("Erro ao buscar por categoria:", err);
        }
        set(() => ({ loading: false }));
      },
      searchByBrand: async (token, brand) => {
        set(() => ({ loading: true }));
        try {
          const response = await api.get(`/products/brands`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { brand },
          });
          set({ results: response.data.products });
        } catch (err) {
          console.error("Erro ao buscar por marca:", err);
        }
        set(() => ({ loading: false }));
      },
      searchBySubcategory: async (token, subcategory) => {
        set(() => ({ loading: true }));
        try {
          const response = await api.get(`/products/subCategories`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { subcategory },
          });
          set({ results: response.data.products });
        } catch (err) {
          console.error("Erro ao buscar por subcategoria:", err);
        }
        set(() => ({ loading: false }));
      },
      brands: [],
      categories: [],
      subcategories: [],
      loadOptions: async (token: string) => {
        const { brands, categories, subcategories } = get();
        if (brands.length && categories.length && subcategories.length) {
          return; // Se já existem dados, não faz a requisição novamente
        }

        try {
          const [brandRes, categoryRes, subcategoryRes] = await Promise.all([
            api.get("/products/brands", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            api.get("/products/categories", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            api.get("/products/subCategories", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          set({
            brands: brandRes.data,
            categories: categoryRes.data,
            subcategories: subcategoryRes.data,
          });
        } catch (error) {
          console.error("Erro ao carregar opções:", error);
        }
      },
      clearResults: () => {
        set(() => ({ results: [] }));
      },
      history: [],
      addHistory: (item) => {
        const hist = get().history.filter((i) => i !== item);
        if (hist.length !== get().history.length) return;
        set(() => ({ history: [item, ...hist] }));
      },
      removeHistory: (item) => {
        const hist = get().history.filter((i) => i !== item);
        set(() => ({ history: hist }));
      },
      clearHistory: () => {
        set(() => ({ history: [] }));
      },
      initialFilter: null,
      setInitialFilter: (filter) => set({ initialFilter: filter }),
      clearInitialFilter: () => set({ initialFilter: null }),
    }),
    {
      name: "search",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => {
        return { history: state.history };
      },
    }
  )
);

export default useSearchStore;
