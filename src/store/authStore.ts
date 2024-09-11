import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  birth?: string | null;
  id?: string | null;
  subscription?: any | null;
  totalCars?: number | null;
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

// Base URL para as requisições API (ajuste conforme necessário)
const api = axios.create({
  baseURL: 'https://sua-api.com',
});

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      favorites: [],
      favsRef: [],

      removeFavorite: async (id) => {
        try {
          const favID = get().favsRef.find((f) => f.post_id === id);
          const newFavs = get().favorites.filter((f) => f.id !== id);
          set({ favorites: newFavs });
          if (!favID) return;
          await api.delete(`/favorites/${favID.id}`, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
        } catch (error) {
          console.error('Erro ao remover favorito:', error);
        }
      },

      addFavorite: async (item) => {
        try {
          await api.post(
            `/favorites`,
            { post_id: item.id, user_id: get().user?.id || '' },
            { headers: { Authorization: `Bearer ${get().token}` } }
          );
          set((state) => ({ favorites: [...state.favorites, item] }));
        } catch (error) {
          console.error('Erro ao adicionar favorito:', error);
        }
      },

      getFavorites: async () => {
        try {
          const response = await api.get('/favorites', {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          if (response.status === 200) {
            set({ favsRef: response.data });
            const ids = response.data.map((item: any) => item.post_id);
            const favCars = await api.post(
              `/post/list/1/50`,
              { id: ids },
              { headers: { Authorization: `Bearer ${get().token}` } }
            );
            set({ favorites: favCars.data });
          }
        } catch (error) {
          console.error('Erro ao buscar favoritos:', error);
        }
      },

      login: async (email, password) => {
        try {
          const response = await api.post('/login', { email, password });
          if (response.status === 200) {
            set({ token: response.data.data.token, isAuthenticated: true });
            await get().getMe();
            return { statusCode: 200 };
          }
        } catch (error: any) {
          set({ token: null, user: null, isAuthenticated: false });
          return error.response.data;
        }
      },

      register: async (userInfo) => {
        try {
          const response = await api.post('/register', userInfo);
          if (response.status === 200) {
            const user = response.data;
            if (user.data.token) {
              set({ token: user.data.token, isAuthenticated: true });
              await get().getMe();
            } else {
              await get().login(userInfo.email, userInfo.password);
            }
          }
          return response;
        } catch (error: any) {
          return error.response;
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
            const response = await api.post(
              `/post/list/1/50`,
              { user_id: [get().user?.id] },
              { headers: { Authorization: `Bearer ${get().token}` } }
            );
            set((state) => ({
              user: {
                ...state.user,
                totalCars: response.data.length,
              } as User,
            }));
          }
        } catch (error) {
          console.error('Erro ao buscar posts:', error);
        }
      },

      getSubscriptions: async () => {
        try {
          if (get().user) {
            const response = await api.get('/subscriptions', {
              headers: { Authorization: `Bearer ${get().token}` },
            });
            set((state) => ({
              user: {
                ...state.user,
                subscription:
                  response.status === 200 ? response.data.subscription : null,
              } as User,
            }));
          }
        } catch (error) {
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
          const response = await api.get('/user', {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set({
            user: {
              name: response.data.name,
              email: response.data.email,
              avatar: response.data.profile_photo_path,
              phone: response.data.phone,
              birth: response.data.birth,
              id: response.data.id,
            },
          });
          return true;
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          return false;
        }
      },

      updateUser: async (userInfo) => {
        try {
          const response = await api.put(
            '/user',
            userInfo,
            { headers: { Authorization: `Bearer ${get().token}` } }
          );
          if (response.status === 200) {
            set((state) => ({
              user: {
                ...state.user,
                ...response.data.user,
              },
            }));
            return response;
          }
        } catch (error: any) {
          return error.response;
        }
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        favorites: state.favorites,
        favsRef: state.favsRef,
      }),
    }
  )
);

export default useAuthStore;
