import api from "@/utils/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
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

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  token: null | string;
  login: (login: string, password: string) => Promise<any>;
  register: (userInfo: any) => Promise<any>;
  logout: () => void;
  getMe: () => Promise<boolean>;
  favorites: any[];
  favsRef: any[];
  getFavorites: () => Promise<void>;
  removeFavorite: (id: any) => Promise<void>;
  addFavorite: (id: any) => Promise<void>;
  updateUser: (userInfo: any) => Promise<any>;
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
          console.log("res", loggedJSON);
          if (loggedJSON.status === 200) {
            set({ token: loggedJSON.data.access_token });
            set({ isAuthenticated: true });
            await get().getMe();
            return { statusCode: 200 };
          }
        } catch (err: any) {
          console.log("erro", err);
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
      favorites: [],
      favsRef: [],
      removeFavorite: async (id) => {
        try {
          const favID = get().favsRef.find((f) => f.post_id === id);
          const newFavs = get().favorites.filter((f) => f.id !== id);
          set({ favorites: newFavs });
          if (!favID) return;
          if (favID.length === 0) return;
          await api.delete(`/favorites/${favID.id}`, {
            headers: { Authorization: "Bearer " + get().token },
          });
        } catch (error) {}
      },
      addFavorite: async (item) => {
        try {
          await api.post(
            `/favorites`,
            { post_id: item.id, user_id: get().user?.id || "" },
            { headers: { Authorization: "Bearer " + get().token } }
          );
          const newFavs = [...get().favorites, item];
          set({ favorites: newFavs });
        } catch (error) {
          console.error("Erro ao adicionar favorito:", error);
        }
      },
      getFavorites: async () => {
        try {
          const favs = await api.get("/favorites", {
            headers: { Authorization: "Bearer " + get().token },
          });
          if (favs.status === 200) {
            set({ favsRef: [...favs.data] });
            const ids = favs.data.map((i: any) => {
              return i.post_id;
            });
            const favCars = await api.post(
              `/post/list/1/50`,
              { id: ids },
              { headers: { Authorization: "Bearer " + get().token } }
            );

            set({ favorites: [...favCars.data] });
          }
        } catch (error) {
          console.error("Erro ao buscar favoritos:", error);
        }
      },
      updateUser: async (userInfo) => {
        try {
          const updatedUser = await api.put(
            "/user",
            { ...userInfo },
            { headers: { Authorization: "Bearer " + get().token } }
          );
          if (updatedUser.status === 200) {
            const user = updatedUser.data.user;
            set({
              user: {
                name: user.name,
                email: user.email,
                avatar: user.profile_photo_path,
                phone: user.phone,
                address: user.address,
                birth: user.birth,
              },
            });
            return updatedUser;
          }
        } catch (err: any) {
          return err.response;
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
      }),
    }
  )
);

export default useAuthStore;
