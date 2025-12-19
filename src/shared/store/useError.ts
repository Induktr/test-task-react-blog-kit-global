import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { combine } from "zustand/middleware";

export const useError = create(combine({
  error: "",
  setError: (_error: string) => {},
  clearError: () => {},
},
  persist(
    (set) => ({
      error: "",
      setError: (error: string) => set({ error }),
    clearError: () => set({ error: "" }),
  }),
  {
    name: "error",
    storage: createJSONStorage(() => localStorage),
  }
)));
