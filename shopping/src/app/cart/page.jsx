"use client";
import React, { useEffect, useState } from "react";
import "../../style/Cart.css";
import CartItem from "@/components/CartItem";
import AddressForm from "@/components/AddressForm";
import OrderSuccessPage from "@/components/OrderPlaced";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [renderId, setRenderId] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);
  const calcTotal = () => {
    let amt = 0;
    cartItems.map((item) => {
      let totalPrice =
        parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity;
      amt += totalPrice;
    });
    return amt;
  };
  useEffect(() => {
    setTotal(calcTotal());
  }, [cartItems]);

  return (
    <>
      {renderId === 0 && (
        <div className="cartListContainer w-screen h-screen flex flex-col">
          {cartItems.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              Add items to cart
            </div>
          ) : (
            <div className="w-full h-full flex flex-row justify-evenly">
              <div className="cardListContainer w-1/2 h-full flex flex-col items-center justify-center gap-2">
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
              <div className="w-1/2 h-full flex flex-col justify-center gap-4">
                {/* billing */}
                {cartItems &&
                  cartItems.map((item) => {
                    let totalPrice =
                      parseFloat(item.price.replace(/[^0-9.]/g, "")) *
                      item.quantity;
                    return (
                      <div
                        key={item.id}
                        className="w-[95%] h-8 flex justify-between"
                      >
                        <span>{item.name}</span>
                        <span>{totalPrice}</span>
                      </div>
                    );
                  })}
                <div className="w-[95%] h-8 flex justify-between">
                  <span className="text-white font-bold text-xl">Total</span>
                  <span>{total}</span>
                </div>
                <div className="w-full h-10 flex justify-end px-8">
                  <button
                    className="w-28 h-10 bg-green-700 border-green-700 rounded-md"
                    onClick={() => setRenderId(1)}
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {renderId === 1 && <AddressForm setRenderId={setRenderId} />}
      {renderId === 2 && <OrderSuccessPage />}
    </>
  );
};

export default CartList;
