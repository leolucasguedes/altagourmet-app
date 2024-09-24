import { create } from 'zustand'

interface CurrentPageState {
    currentPage: string | null,

    setCurrentPage: (value: string) => void
}

export const useCurrentPageStore = create<CurrentPageState>()((set) => ({
    currentPage: null,

    setCurrentPage: (value) => set({ currentPage: value }),

}))