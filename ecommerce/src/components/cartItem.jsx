import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <li key={item.id} className="px-6 py-4 flex items-center">
      <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <Minus size={16} />
        </button>

        <span className="mx-2 w-8 text-center">{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="ml-6 text-right">
        <p className="text-sm font-medium text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="ml-4 text-gray-400 hover:text-red-500"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
};

export default CartItem;
