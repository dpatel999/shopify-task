// src/context/useCart.js
import { useContext } from "react";
import { CartContext } from "./CartContext";

export function useCart() {
  return useContext(CartContext);
}