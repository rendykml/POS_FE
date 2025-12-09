import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,

      login: (data) =>
        set({
          user: data.user,
          token: data.token,
          role: data.role,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          role: null,
        }),
    }),
    {
      name: "auth-storage", 
    }
  )
);
