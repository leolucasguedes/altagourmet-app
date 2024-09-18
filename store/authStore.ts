import api from "@/utils/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import zustandStorage from "@/utils/zustandStorage";

interface User {
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  birth?: string | null;
  id?: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  token: null | string;
  favorites: any[];
  favsRef: any[];
  getFavorites: () => Promise<void>;
  removeFavorite: (id: any) => Promise<void>;
  addFavorite: (id: any) => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  register: (userInfo: any) => Promise<any>;
  logout: () => void;
  getMe: () => Promise<boolean>;
  getSubscriptions: () => Promise<void>;
  getPosts: () => Promise<void>;
  updateUser: (userInfo: any) => Promise<any>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      favorites: [],
      favsRef: [],
      removeFavorite: async (id) => {
        try {
          const favID = get().favsRef.find((f) => f.post_id === id);
          const newFavs = get().favorites.filter((f) => f.id !== id);
          set({ favorites: newFavs });
          if (!favID) return;
          await api.delete(`/favorites/${favID.id}`, {
            headers: { Authorization: "Bearer " + get().token },
          });
        } catch (error) {
          console.error("Erro ao remover favorito:", error);
        }
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
            const ids = favs.data.map((i: any) => i.post_id);
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
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email, password) => {
        try {
          const loggedJSON = await api.post("/login", { email, password });
          if (loggedJSON.status === 200) {
            set({ token: loggedJSON.data.data.token });
            set({ isAuthenticated: true });
            await get().getMe();
            return { statusCode: 200 };
          }
        } catch (err: any) {
          set({ token: null, user: null, isAuthenticated: false });
          return err.response?.data;
        }
      },
      register: async (userInfo: any) => {
        try {
          const userJSON = await api.post("/register", userInfo);
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
          favorites: [],
          favsRef: [],
        });
      },
      getPosts: async () => {
        try {
          if (get().user) {
            const offers = await api.post(
              `/post/list/1/50`,
              { user_id: [get().user?.id] },
              { headers: { Authorization: "Bearer " + get().token } }
            );
            set((state) => ({
              user: {
                ...state.user,
                totalCars: offers.data.length,
              } as User,
            }));
          }
        } catch (err) {
          console.error("Erro ao buscar anúncios do usuário:", err);
        }
      },
      getSubscriptions: async () => {
        try {
          if (get().user) {
            const subscriptions = await api.get("/subscriptions", {
              headers: { Authorization: "Bearer " + get().token },
            });
            set((state) => ({
              user: {
                ...state.user,
                subscription:
                  subscriptions.status === 200
                    ? subscriptions.data.subscription
                    : null,
              } as User,
            }));
          }
        } catch (err) {
          set((state) => ({
            user: {
              ...state.user,
              subscription: null,
            } as User,
          }));
        }
      },
      getMe: async () => {
        try {
          const userJSON = await api.get("/user", {
            headers: { Authorization: "Bearer " + get().token },
          });
          const user = userJSON.data;
          set({
            user: {
              name: user.name,
              email: user.email,
              avatar: user.profile_photo_path,
              phone: user.phone,
              birth: user.birth,
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
                birth: user.birth,
              },
            });
            return updatedUser;
          }
        } catch (err: any) {
          console.error("Erro ao atualizar dados do usuário:", err);
          return err.response;
        }
      },
    }),
    {
      name: "auth",
      storage: zustandStorage,
    }
  )
);

export default useAuthStore;
