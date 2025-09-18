// src/context/CartContext.jsx
import React, { createContext, useEffect, useReducer, useState } from "react";

const CartContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  console.log("🌀 Reducer called with:", action);

  switch (action.type) {
    case "INIT": {
      console.log("🔄 INIT with", action.payload);
      return { items: action.payload };
    }
    case "ADD": {
      console.log("➕ ADD", action.payload);
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        console.log("✅ Item already in cart, incrementing:", exists);
        return {
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      console.log("🆕 Adding new item:", action.payload);
      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "SET_QUANTITY": {
      console.log("✏️ SET_QUANTITY", action.payload);
      return {
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case "REMOVE": {
      console.log("🗑️ REMOVE", action.payload.id);
      return {
        items: state.items.filter(i => i.id !== action.payload.id),
      };
    }
    default:
      console.warn("⚠️ Unknown action:", action.type);
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage (only once)
  useEffect(() => {
    const stored = localStorage.getItem("cart_v1");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        console.log("✅ Restoring cart from localStorage:", parsed);
        dispatch({ type: "INIT", payload: parsed });
      }
    }
    setHydrated(true); // ✅ Mark as loaded
  }, []);

  // Save cart to localStorage (only after hydration)
  useEffect(() => {
    if (hydrated) {
      console.log("💾 Saving cart to localStorage:", state.items);
      localStorage.setItem("cart_v1", JSON.stringify(state.items));
    }
  }, [state.items, hydrated]);

  async function addToCart(product) {
    console.log("🛒 addToCart called with:", product);
    dispatch({ type: "ADD", payload: product });
  }

  async function updateQuantity(id, newQty) {
    console.log("🔧 updateQuantity called for", id, "→", newQty);
    await new Promise(res => setTimeout(res, 400)); // fake API delay
    if (newQty <= 0) {
      dispatch({ type: "REMOVE", payload: { id } });
    } else {
      dispatch({
        type: "SET_QUANTITY",
        payload: { id, quantity: newQty },
      });
    }
    return true;
  }

  return (
    <CartContext.Provider value={{ items: state.items, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };