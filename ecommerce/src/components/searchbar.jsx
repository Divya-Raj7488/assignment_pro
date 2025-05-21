"use client";
import { Search } from "lucide-react";
import React from "react";

const Searchbar = ({ searchParams, setSearchParams }) => {
  return (
    <div className="relative w-[90%]">
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
  );
};

export default Searchbar;
