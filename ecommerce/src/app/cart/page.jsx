"use client";
import { useState, useEffect } from "react";
import Confetti from "../../components/order/confetti";
import { OrderCompleteMessage } from "../../components/order/orderStatus";
import CartItem from "../../components/cart/cartItem";
import OrderSummary from "../../components/order/summary";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      image: "/api/placeholder/100/100",
      quantity: 1,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 24.99,
      image: "/api/placeholder/100/100",
      quantity: 2,
      category: "Electronics",
    },
    {
      id: 3,
      name: "USB-C Charging Cable",
      price: 12.99,
      image: "/api/placeholder/100/100",
      quantity: 1,
      category: "Electronics",
    },
  ]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

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

  const handleCheckout = () => {
    setShowConfetti(true);
    setOrderComplete(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const startNewOrder = () => {
    setOrderComplete(false);
    setCartItems([]);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      .animate-confetti-fall {
        animation: confetti-fall linear forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {showConfetti && <Confetti />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Shopping Cart
        </h1>

        {orderComplete ? (
          <OrderCompleteMessage startNewOrder={startNewOrder} />
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
            >
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
                      key={item.id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeItem={removeItem}
                    />
                  ))}
                </ul>
              </div>
            </div>

            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              handleCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
}
