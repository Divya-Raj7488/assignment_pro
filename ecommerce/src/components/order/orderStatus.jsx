"use client";
import { Check } from "lucide-react";
import React from "react";

const OrderCompleteMessage = ({ startNewOrder }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
        <Check size={32} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Complete!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase! Your order has been placed successfully.
      </p>
      <button
        onClick={startNewOrder}
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export { OrderCompleteMessage };
