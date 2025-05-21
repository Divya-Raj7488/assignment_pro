"use client";
import { Search, ShoppingCart, User } from "lucide-react";

const Navbar = ({ searchParams, setSearchParams }) => {
  return (
    <header className="w-screen bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">
            Shop<span className="text-gray-800">Hub</span>
          </h1>
        </div>
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchParams}
              onChange={(e) => {
                setSearchParams(e.target.value);
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-2">
              <Search size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ShoppingCart
              size={24}
              className="text-gray-700 cursor-pointer hover:text-blue-600"
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              3
            </span>
          </div>
          <User
            size={24}
            className="text-gray-700 cursor-pointer hover:text-blue-600"
          />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
