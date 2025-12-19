import { create } from "zustand";
import { combine } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearch = create(combine({
  search: "",
  setSearch: (_search: string) => {},
  clearSearch: () => {},
},
  persist(
    (set) => ({
      search: "",
      setSearch: (search: string) => set({ search }),
      clearSearch: () => set({ search: "" }),
    }),
    {
      name: "blog-search-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
));