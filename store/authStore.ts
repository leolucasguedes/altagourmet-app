import api from "@/utils/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import zustandStorage from "@/utils/zustandStorage";

interface User {
  name: string;
  address: string;
  fidelized?: boolean;
  fidelityPoints?: number;
  email: string;
  verified_at?: string | null;
  phone?: string | null;
  avatar?: string | null;
  birth?: string | null;
  id?: string | null;
}
interface RegisterDTO {
  phone: string
  name: string
  email: string
  document: string
  address: string
  password: string
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
          if (loggedJSON.data.access_token) {
            set({ token: loggedJSON.data.access_token });
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
          const userJSON = await api.post('auth/register', { ...userInfo })
          const user = userJSON.data
          if (userJSON.status === 201 || userJSON.status === 200) {
            if (user.access_token) {
              set({ token: user.access_token });
              set({ isAuthenticated: true });
              get().getMe();
              return true;
            } else {
              return false;
            }
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
          const userJSON = await api.get("/auth/me", {
            headers: { Authorization: "Bearer " + get().token },
          });
          const user = userJSON.data;
          console.log(user)
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
      storage: createJSONStorage(() => zustandStorage),
      // partialize: (state) => ({
      //   isAuthenticated: state.isAuthenticated,
      //   user: state.user,
      //   token: state.token,
      // }),
    }
  )
);

export default useAuthStore;
