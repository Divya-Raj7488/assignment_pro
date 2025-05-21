"use client";
import { useState } from "react";
import CartItem from "../../components/cartItem";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      image: "/api/placeholder/100/100",
      quantity: 1,
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 24.99,
      image: "/api/placeholder/100/100",
      quantity: 2,
    },
    {
      id: 3,
      name: "USB-C Charging Cable",
      price: 12.99,
      image: "/api/placeholder/100/100",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <CartItem
                      item={item}
                      key={item.id}
                      removeItem={removeItem}
                      updateQuantity={updateQuantity}
                    />
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="text-gray-900 font-medium">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Shipping</p>
                  <p className="text-gray-900 font-medium">
                    ${shipping.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Tax</p>
                  <p className="text-gray-900 font-medium">${tax.toFixed(2)}</p>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-lg font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Checkout
              </button>

              <div className="mt-4">
                <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-800">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
