import zustandStorage from '../utils/zustandStorage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ICard {
    number: string,
    due_to: string,
    cvv: string,
    name: string,
    cpf: string,
    method: string,
}
interface CardsState {
    cards: ICard[]
    addCard: (card: ICard) => void
    selectedCard: ICard | null
    selectCard: (card: ICard) => void
    removeCard: (card: ICard) => void
}

const useCardsStore = create<CardsState>()(
    persist(
        (set, get) => ({
            cards: [],
            addCard: (card: ICard) => {
                set((state) => ({
                    cards: [...state.cards, card]
                }))
            },
            selectedCard: null,
            selectCard: (card: ICard) => {
                set({ selectedCard: card })
            },
            removeCard: (card: ICard) => {
                set((state) => ({
                    cards: state.cards.filter((item) => item !== card)
                }))
                if (get().selectedCard === card) {
                    set({ selectedCard: null })
                }
            }
        }),
        {
            name: "card-store",
            storage: createJSONStorage(() => zustandStorage),
            partialize: (state) => ({
                addresses: state.cards,
                selectedAddress: state.selectedCard
            })
        })
)

export default useCardsStore