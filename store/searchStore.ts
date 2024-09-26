import api from "@/utils/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import zustandStorage from "@/utils/zustandStorage";

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
  filters: Filters | null;
  results: any[];
  setFilter: (filter: string, value: any) => void;
  clearFilters: () => void;
  searchForResults: (token: string, term?: string) => Promise<any>;
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
        set(() => ({ searchTerm: term }));
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

        try {
          const searchPayload: {
            search?: string;
            brand?: string[];
            category?: string[];
            subcategory?: string[];
            price?: { start: string; end: string };
            user_id?: string[];
          } = { search: term || undefined };

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

          const offersRes = await api.get(
            `/products/search/${term || ""}/1/50`,
            {
              headers: { Authorization: `Bearer ${token}` },
              params: searchPayload,
            }
          );

          if (offersRes.status === 200) {
            set({ results: offersRes.data });
          }
        } catch (err) {
          console.error("Erro ao buscar resultados:", err);
        }

        set(() => ({ loading: false }));
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
