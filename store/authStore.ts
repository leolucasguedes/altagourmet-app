import api from "@/utils/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "@/utils/zustandStorage";

interface User {
  name: string;
  address: string;
  fidelized: boolean;
  fidelityPoints: number;
  email: string;
  verified_at?: string | null;
  phone?: string | null;
  id?: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  token: null | string;
  login: (login: string, password: string) => Promise<any>;
  register: (userInfo: any) => Promise<any>;
  logout: () => void;
  getMe: () => Promise<boolean>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (login, password) => {
        try {
          const loggedJSON = await api.post("/auth/login", { login, password });
          console.log('res', loggedJSON);
          if (loggedJSON.status === 200) {
            set({ token: loggedJSON.data.access_token });
            set({ isAuthenticated: true });
            await get().getMe();
            return { statusCode: 200 };
          }
        } catch (err: any) {
          console.log('erro', err)
          set({ token: null, user: null, isAuthenticated: false });
          return err;
        }
      },
      register: async (userInfo: any) => {
        try {
          const userJSON = await api.post("/auth/register", userInfo);
          if (userJSON.status === 200) {
            const user = userJSON.data;
            if (user.data.token) {
              set({ token: user.data.token });
              set({ isAuthenticated: true });
              get().getMe();
            } else {
              get().login(userInfo.email, userInfo.password);
            }
          }
          return userJSON;
        } catch (err: any) {
          return { ...err.response };
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
          const userJSON = await api.get("/auth/me", {
            headers: { Authorization: "Bearer " + get().token },
          });
          const user = userJSON.data;
          set({
            user: {
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              fidelized: user.fidelized,
              fidelityPoints: user.fidelityPoints,
              verified_at: user.verified_at,
              id: user.id,
            },
          });
          return true;
        } catch (err) {
          console.error("Erro ao buscar dados do usuário:", err);
          return false;
        }
      },
    }),
    {
      name: "costumer-auth",
      storage: zustandStorage,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      })
    }
  )
);

export default useAuthStore;
