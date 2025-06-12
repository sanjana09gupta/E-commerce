"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  cancelPrice?: number;
  quantity: number;
}

interface TotalQuantityContextType {
  totalQuantity: number;
  setTotalQuantity: (quantity: number) => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
}

const TotalQuantityContext = createContext<TotalQuantityContextType | undefined>(undefined);

export const TotalQuantityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load initial cart data from localStorage
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(existingCart);
    const total = existingCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    setTotalQuantity(total);
  }, []);

  const addToCart = (item: CartItem) => {
    let updatedCart = [...cartItems];
    const index = updatedCart.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setTotalQuantity(updatedCart.reduce((sum, i) => sum + i.quantity, 0));
  };

  return (
    <TotalQuantityContext.Provider value={{ totalQuantity, setTotalQuantity, cartItems, addToCart }}>
      {children}
    </TotalQuantityContext.Provider>
  );
};

export const useTotalQuantity = () => {
  const context = useContext(TotalQuantityContext);
  if (!context) {
    throw new Error("useTotalQuantity must be used within a TotalQuantityProvider");
  }
  return context;
};
