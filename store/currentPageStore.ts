import { create } from 'zustand'

interface CurrentPageState {
    currentPage: string | null,

    setCurrentPage: (value: string) => void
}

const useCurrentPageStore = create<CurrentPageState>()((set) => ({
    currentPage: null,

    setCurrentPage: (value) => set({ currentPage: value }),

}))

export default useCurrentPageStore