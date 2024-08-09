import { create } from "zustand";

const useClassStore = create((set) => ({
  showModalAdd: false,
  setShowModalAdd: (value) => set({ showModalAdd: value }),
  showModalEdit: false,
  setShowModalEdit: (value) => set({ showModalEdit: value }),
  showModalView: false,
  setShowModalView: (value) => set({ showModalView: value }),
  showModalDelete: false,
  setShowModalDelete: (value) => set({ showModalDelete: value }),

  handleClose: () =>
    set({
      showModalView: false,
      showModalEdit: false,
      showModalAdd: false,
      showModalDelete: false,
    }),
  dataRow: {},
  setDataRow: (value) => set({ dataRow: value }),
}));

export default useClassStore;
