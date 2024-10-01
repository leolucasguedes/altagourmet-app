import api from "../utils/api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import zustandStorage from "../utils/zustandStorage";

interface ResetPasswordState {
  requestPasswordReset: (email: string) => Promise<any>;
  resetPassword: (token: string, password: string) => Promise<any>;
}

const useResetPasswordStore = create<ResetPasswordState>()(
  persist(
    (set, get) => ({
      requestPasswordReset: async (email: string) => {
        try {
          const response = await api.post("/tenant/auth/reset-password", {
            email: email,
          });
          return response.data;
        } catch (err: any) {
          console.error("Erro ao solicitar reset de senha:", err);
          throw err;
        }
      },

      resetPassword: async (token: string, password: string) => {
        try {
          const response = await api.post(`/tenant/auth/reset-password/${token}`, {
            password: password,
          });
          return response.data;
        } catch (err: any) {
          console.error("Erro ao resetar senha:", err);
          throw err;
        }
      },
    }),
    {
      name: "reset-password",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useResetPasswordStore;
