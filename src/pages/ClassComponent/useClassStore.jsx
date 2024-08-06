import { create } from "zustand";

const useClassStore = create((set) => ({
  showModalAdd: false,
  setShowModalAdd: (value) => set({ showModalAdd: value }),
  mode: false,
  setMode: (value) => set({ mode: value }),
  showModalCommon: false,
  setShowModalCommon: (value) => set({ showModalCommon: value }),
  handleClose: () => set({ showModalAdd: false, showModalCommon: false }),
}));

export default useClassStore;
