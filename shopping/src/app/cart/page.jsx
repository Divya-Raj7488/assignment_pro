"use client";
import React, { useEffect, useState } from "react";
import "../../style/Cart.css";
import CartItem from "@/components/CartItem";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <main className="cartListContainer w-screen h-screen flex flex-col">
      {cartItems.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          Add items to cart
        </div>
      ) : (
        <>
          <div className="cardListContainer w-1/2 h-full flex flex-col items-center justify-center">
            {/* items */}
            {cartItems.map(({ id, name, price, imgUrl, quantity }) => {
              return (
                <CartItem
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  imgUrl={imgUrl}
                  quantity={quantity}
                  setCartItems={setCartItems}
                />
              );
            })}
          </div>
          <div>{/* billing */}</div>
        </>
      )}
    </main>
  );
};

export default CartList;
