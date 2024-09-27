import api from '@/utils/api'
import zustandStorage from '@/utils/zustandStorage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
export interface IAddress {
    street_address: string[],
    city: string,
    state: string,
    zip_code: string,
    country: string
}
interface ShippingState {
    addresses: IAddress[],
    addAddress: (address: IAddress) => void,
    selectedAddress: IAddress | null,
    selectAddress: (address: IAddress) => void,
    removeAddress: (address: IAddress) => void,
    calculateShipping: (token: string, shopId: number) => Promise<any>,
    quote_id: string,
    shipping_fee: number,
    duration: number,
    pickup_duration: number,
    error_message: string
}

const useShippingStore = create<ShippingState>()(
    persist(
        (set, get) => ({
            duration: 0,
            error_message: '',
            pickup_duration: 0,
            selectedAddress: null,
            addresses: [],
            quote_id: '',
            shipping_fee: 0,
            addAddress: (address: IAddress) => {
                if (get().addresses.includes(address)) return
                set((state) => ({
                    addresses: [...state.addresses, address]
                }))
            },
            selectAddress: (address: IAddress) => {
                set({ selectedAddress: address })
            },
            removeAddress: (address: IAddress) => {
                set((state) => ({
                    addresses: state.addresses.filter((item) => item !== address)
                }))
                if (get().selectedAddress === address) {
                    set({ selectedAddress: null })
                }
            },
            calculateShipping: async (token: string, shopId: number) => {
                set({ error_message: '', quote_id: '', shipping_fee: 0, duration: 0, pickup_duration: 0 });
                try {
                    const response = await api.post('/frete/calcular', {
                        dropoff_address: get().selectedAddress,
                        shop_id: shopId
                    }, { headers: { Authorization: 'Bearer ' + token } })
                    if (response.data.kind === 'error') {
                        throw new Error(response.data.message)
                    }
                    const feePlusThirdPercent = (response.data.fee + ((response.data.fee / 100) * 30))
                    set({ quote_id: response.data.id, shipping_fee: feePlusThirdPercent / 100, duration: response.data.duration, pickup_duration: response.data.pickup_duration })
                    return true
                } catch (error) {
                    set({ error_message: 'Envio indisponível' })
                    console.log(error)
                    return false
                }
            }
        }),
        {
            name: "shipping-address",
            storage: createJSONStorage(() => zustandStorage),
            partialize: (state) => ({
                addresses: state.addresses,
                selectedAddress: state.selectedAddress
            })
        })
)

export default useShippingStore