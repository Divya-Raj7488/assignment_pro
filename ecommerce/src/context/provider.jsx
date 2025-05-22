"use client";
import { useState } from "react";
import { MyContext } from "./createContext";

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <MyContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </MyContext.Provider>
  );
};
export default ContextProvider;
