import api from "../utils/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import zustandStorage from "../utils/zustandStorage";

interface User {
  name?: string;
  address: string;
  number: number;
  complement?: string | null;
  email?: string;
  password?: string;
  phone: string | null;
  id?: string | null;
}
interface RegisterDTO {
  phone: string;
  name: string;
  email: string;
  address: string;
  number: number;
  complement?: string | null;
  password: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  token: null | string;
  userOrders: any[];
  login: (login: string, password: string) => Promise<any>;
  register: (userInfo: any) => Promise<any>;
  logout: () => void;
  getMe: () => Promise<boolean>;
  fetchOrders: () => Promise<void>;
  updateUser: (userInfo: any) => Promise<any>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      userOrders: [],
      login: async (login, password) => {
        try {
          const response = await api.post("auth/login", { login, password });
          if (response.data.access_token) {
            set({ token: response.data.access_token });
            set({ isAuthenticated: true });
            await get().getMe();
            return true;
          } else return false;
        } catch (err: any) {
          console.log("erro", err);
          set({ token: null, user: null, isAuthenticated: false });
          return false;
        }
      },
      register: async (userInfo: RegisterDTO) => {
        try {
          const response = await api.post("auth/register", { ...userInfo });
          if (response.status === 201 || response.status === 200) {
            const success = await get().login(
              userInfo.email,
              userInfo.password
            );
            return success;
          } else {
            return false;
          }
        } catch (err: any) {
          console.log("erro", err);
          return false;
        }
      },
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
      getMe: async () => {
        try {
          const response = await api.get("auth/me", {
            headers: { Authorization: "Bearer " + get().token },
          });
          const user = response.data;
          set({
            user: {
              name: user.name,
              email: user.email,
              phone: user.whatsapp,
              address: user.address,
              number: user.number,
              complement: user.complement || null,
              id: user.id,
            },
          });
          return true;
        } catch (err) {
          console.error("Erro ao buscar dados do usuário:", err);
          return false;
        }
      },
      updateUser: async (userInfo) => {
        try {
          const response = await api.put(
            "/user",
            { ...userInfo },
            { headers: { Authorization: "Bearer " + get().token } }
          );
          if (response.status === 200) {
            const user = response.data.user;
            set({
              user: {
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.whatsapp,
                address: user.address,
                number: user.number,
                complement: user.complement || null,
                id: user.id,
              },
            });
            return response.data;
          }
        } catch (err: any) {
          return err.response;
        }
      },
      fetchOrders: async () => {
        try {
          const response = await api.get("orders", {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set({ userOrders: response.data });
        } catch (err) {
          console.error("Erro ao buscar pedidos do usuário:", err);
        }
      },
    }),
    {
      name: "costumer-auth",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
