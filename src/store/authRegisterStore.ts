import { create } from "zustand";

interface RegisterState {
  data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    terms: boolean;
  };
  setData: (field: keyof RegisterState["data"], data: any) => void;
}

export const useAuthRegisterStore = create<RegisterState>((set) => ({
  data: {
    name: "",
    email: "",
    password: "",
    phone: "",
    terms: false,
  },
  setData: (field, newData) =>
    set((state) => ({
      data: { ...state.data, [field]: newData },
    })),
}));
