"use client";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";

const CardItem = ({ id, name, price, imgUrl, setCartItems, quantity }) => {
  const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
  const total = (cleanPrice * quantity).toFixed(2);
  const handleQuantityIncrease = () => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decreaseQuantity = () => {
    setCartItems((prev) => {
      let updatedCart;
      if (quantity > 1) {
        updatedCart = prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        updatedCart = prev.filter((item) => item.id !== id);
      }
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  return (
    <div
      className="w-[90%] h-40 flex flex-row border border-white rounded-md"
      key={id}
    >
      <div className="w-[30%] h-full"></div>
      <div className="w-[70%] h-full flex flex-col justify-center">
        <div className="font-bold text-lg">{name}</div> {/* NAME */}
        <div className="font-bold">{total}</div>
        <div className="text-sm">{quantity}</div>
        <div className="w-20 h-10 flex flex-row justify-evenly items-center">
          <span className="flex items-center">
            <button className="w-full h-full" onClick={handleQuantityIncrease}>
              <IoAddOutline className="w-6 h-6" />
            </button>
          </span>
          <span>{quantity}</span>
          <span className="flex items-center">
            <button className="w-full h-full" onClick={decreaseQuantity}>
              {quantity > 1 ? (
                <IoRemove className="w-6 h-6" />
              ) : (
                <AiFillDelete className="w-6 h-6" />
              )}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
