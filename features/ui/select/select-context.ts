import { createContext, useContext } from "react";

export interface hi {
  value: any;
  visible: any;
  updateValue: any;
  updateVisible: any;
  disableAll: any;
}

const defaultContext = {
  visible: false,
  value: "null",
  updateValue: "feaf",
  updateVisible: "null",
  disableAll: "null",
};

export const SelectContext = createContext<hi | null>(defaultContext);

export const useSelectContext = () => useContext(SelectContext);
