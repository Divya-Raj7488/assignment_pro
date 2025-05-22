"use client";
import { useState } from "react";
import { MyContext } from "./createContext";

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      quantity: 1,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 24.99,
      quantity: 2,
      category: "Electronics",
    },
    {
      id: 3,
      name: "USB-C Charging Cable",
      price: 12.99,
      quantity: 1,
      category: "Electronics",
    },
  ]);
  return (
    <MyContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </MyContext.Provider>
  );
};
export default ContextProvider;
