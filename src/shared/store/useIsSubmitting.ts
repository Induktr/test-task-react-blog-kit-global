import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { combine } from "zustand/middleware";

export const useIsSubmitting = create(combine({
  isSubmitting: false,
  setIsSubmitting: (_isSubmitting: boolean) => {},
},
  persist(
    (set) => ({
      isSubmitting: false,
      setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
    }),
    {
      name: "isSubmitting",
      storage: createJSONStorage(() => localStorage),
    }
  )
));