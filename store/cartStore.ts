import api from "../utils/api";
import { create } from "zustand";

interface CartItem {
  foodId: number;
  quantity: number;
  foodPrice: number;
  foodName: string;
  foodImage?: string;
  complements?: {
    complementId: number;
    quantity: number;
  }[];
}

interface CartState {
  userCart: CartItem[];
  complementPrices: { [key: number]: number };
  totalPlates: number;
  totalComplements: number;
  totalValue: number;
  setUserCart: (value: CartItem[]) => void;
  setComplementPrices: (prices: { [key: number]: number }) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (foodId: number) => void;
  emptyCart: () => void;
  updateTotals: () => void;
  checkout: (userData: {
    userId?: string | null;
    address: string;
    number: number | undefined;
    complement?: string | null;
    whatsapp: string;
    name?: string;
    email?: string;
    password?: string;
  }) => Promise<boolean>;
}

const useCartStore = create<CartState>((set, get) => ({
  userCart: [],
  complementPrices: {},
  totalPlates: 0,
  totalComplements: 0,
  totalValue: 0,

  setUserCart: (value) => set({ userCart: value }),

  setComplementPrices: (prices) => set({ complementPrices: prices }),

  addToCart: (item) => {
    const { userCart } = get();
    const updatedCart = [...userCart];
    const existingIndex = updatedCart.findIndex(
      (cartItem) => cartItem.foodId === item.foodId
    );

    if (existingIndex >= 0) {
      // Se o item já existe, atualize a quantidade e complementos
      updatedCart[existingIndex].quantity += item.quantity;

      if (item.complements) {
        item.complements.forEach((comp) => {
          const existingComp = updatedCart[existingIndex].complements?.find(
            (c) => c.complementId === comp.complementId
          );
          if (existingComp) {
            existingComp.quantity += comp.quantity;
          } else {
            updatedCart[existingIndex].complements?.push(comp);
          }
        });
      }
    } else {
      // Adicionar novo prato ao carrinho
      updatedCart.push(item);
    }

    set({ userCart: updatedCart });
    get().updateTotals();
  },

  removeFromCart: (foodId) => {
    const { userCart } = get();
    const updatedCart = userCart.filter((item) => item.foodId !== foodId);

    set({ userCart: updatedCart });
    get().updateTotals();
  },

  emptyCart: () => {
    set({ userCart: [], totalPlates: 0, totalComplements: 0, totalValue: 0 });
  },

  checkout: async (userData) => {
    const { userCart, totalValue } = get();

    // Estruturar os dados do pedido com os pratos e complementos do carrinho
    const orderData = {
      ...userData,
      totalAmount: totalValue,
      foods: userCart.map((item) => ({
        foodId: item.foodId,
        quantity: item.quantity,
      })),
      complements: userCart.flatMap((item) => item.complements || []),
    };

    try {
      const response = await api.post("/orders/checkout", orderData);
      if (response.status === 201) {
        get().emptyCart(); // Limpar o carrinho após a finalização do pedido
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
      return false;
    }
  },

  // Função para calcular os totais de pratos, complementos e valor total
  updateTotals: () => {
    const { userCart, complementPrices } = get();

    let totalPlates = 0;
    let totalComplements = 0;
    let totalValue = 0;

    userCart.forEach((item) => {
      // Adicionar quantidade de pratos e valor do prato principal
      totalPlates += item.quantity;
      totalValue += item.quantity * item.foodPrice;

      // Adicionar complementos
      if (item.complements) {
        item.complements.forEach((comp) => {
          totalComplements += comp.quantity;
          totalValue +=
            comp.quantity * (complementPrices[comp.complementId] || 0);
        });
      }
    });

    set({ totalPlates, totalComplements, totalValue });
  },
}));

export default useCartStore;
