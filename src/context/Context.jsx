import { createContext } from "react";
export const CartContext = createContext({
  cart: [],
  setCart: function () {},
});

export const History = createContext({
  history: [],
  setHistory: function () {},
});
