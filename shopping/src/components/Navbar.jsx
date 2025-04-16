import React from "react";
import "../style/Navbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const Navbar = () => {
  return (
    <main className="navbar w-screen h-15 border border-amber-50 rounded-sm flex flex-row">
      <div className="w-1/2 h-full"></div>
      <div className="w-1/2 h-full flex flex-row justify-end gap-4 px-4 items-center">
        <button type="submit">
          <AiFillHeart className="w-8 h-8 color-white cursor-pointer" />
        </button>
        <button type="submit">
          <AiOutlineShoppingCart className="w-8 h-8 color-white cursor-pointer" />
        </button>
      </div>
    </main>
  );
};

export default Navbar;
