import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { combine } from "zustand/middleware";

export const useIsLoading = create(combine({
  isLoading: false,
  setIsLoading: (_isLoading: boolean) => {},
},
  persist(
    (set) => ({
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: "isLoading",
      storage: createJSONStorage(() => localStorage),
    }
  )
));