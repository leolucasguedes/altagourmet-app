import api from "@/utils/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  addHistory: (item: string, token?: string) => void;
  removeHistory: (item: string) => void;
  clearHistory: () => void;
  loading: boolean;
  initialFilter: string | null;
  setInitialFilter: (filter: string) => void;
  clearInitialFilter: () => void;
}

const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      loading: false,

      searchTerm: "",
      setSearchTerm: (termo) => {
        set(() => ({ searchTerm: termo }));
      },
      filters: null,
      results: [],
      setFilter: (filter: string, value: any) => {
        set((state) => ({ filters: { ...state.filters, [filter]: value } }));
      },
      clearFilters: () => {
        set(() => ({ filters: null }));
      },
      searchForResults: async (token, term?) => {
        set(() => ({ loading: true }));
        const filters = get().filters;

        try {
          const formattedFilters = { ...filters };

          if (filters?.price) {
            formattedFilters.price = {
              start: String(parseInt(filters.price.start) || 0),
              end: String(
                parseInt(filters.price.end) || Number.MAX_SAFE_INTEGER
              ),
            };
          }

          const searchPayload = {
            ...formattedFilters,
            search: term || undefined,
          };

          if (term) {
            get().addHistory(term, token);
          }

          const offersRes = await api.post(`/post/list/1/50`, searchPayload, {
            headers: { Authorization: "Bearer " + token },
          });
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
      addHistory: (item, token) => {
        const hist = get().history.filter((i) => i !== item);
        if (hist.length === get().history.length) {
          api.post(
            `/post/list/1/50`,
            { search: item },
            { headers: { Authorization: "Bearer " + token } }
          );
        }
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
      partialize: (state) => {
        return { history: state.history };
      },
    }
  )
);

export default useSearchStore;
