import { create } from "zustand";

const useDashBoardStore = create((set) => ({
  year: "2022",
  setYear: (value) => set({ year: value }),
}));

export default useDashBoardStore;
