import { create } from "zustand";

interface State {
  data: any;
}
interface Action {
  setData: (key: string, vlue: any) => void;
  resetData: () => void;
}
export const usePageDataStore = create<State & Action>((set) => ({
  data: {},
  setData: (key, value) => set((state) => ({ ...state.data, [key]: value })),
  resetData: () => set({ data: {} }),
}));
