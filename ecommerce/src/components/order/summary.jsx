import React from "react";

const OrderSummary = ({ subtotal, shipping, tax, total, handleCheckout }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Subtotal</p>
          <p className="text-gray-900 font-medium">${subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-500">Shipping</p>
          <p className="text-gray-900 font-medium">${shipping.toFixed(2)}</p>
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

      <button
        onClick={handleCheckout}
        className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Checkout
      </button>

      <div className="mt-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
