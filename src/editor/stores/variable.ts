import { create } from "zustand";

export interface Variable {
  name: string;
  defaultValue: string;
  remark: string;
}
interface State {
  variables: Variable[];
}
interface Action {
  setVariables: (variables: Variable[]) => void;
}
export const useVariablesStore = create<State & Action>((set) => ({
  variables: [],
  setVariables: (variables) => set({ variables }),
}));
