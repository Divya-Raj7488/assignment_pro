"use client";
import React, { useEffect, useState } from "react";
import "../style/Navbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";

const Navbar = ({ setSearchParams }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // add debouncing for optimied data fetching
  useEffect(() => {
    let timer = setTimeout(() => {
      setSearchParams(searchInput);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <main className="navbar w-[95vw] h-15 border border-amber-50 rounded-sm flex flex-row">
      <div className="h-full flex flex-row">
        <span className="h-full text-lg font-bold flex items-center px-4">
          ShopHere
        </span>
        <ul className="categoryList w-[35vw] h-full flex flex-row justify-evenly items-center cursor-pointer text-sm font-bold">
          <li>Electronics</li>
          <li>Books</li>
          <li>Clothing</li>
          <li>Toys</li>
          <li>Sports</li>
        </ul>
      </div>
      <div className="w-1/2 h-full flex flex-row justify-end gap-4 px-4 items-center flex-1">
        <div className="w-3/4 h-full flex items-center">
          <input
            type="text"
            placeholder="Search here"
            className="w-full h-8 rounded-md pl-4 border border-gray-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Link href="/wishlist">
          <AiFillHeart className="w-8 h-8 color-white cursor-pointer" />
        </Link>
        <Link href="/cart">
          <AiOutlineShoppingCart className="w-8 h-8 color-white cursor-pointer" />
        </Link>
        <button
          className="menu"
          onClick={() => {
            setToggleModal(!toggleModal);
          }}
        >
          <BiMenu className="menu w-8 h-8 text-white" />
          {toggleModal && (
            <div className="modal w-40 min-h-40 absolute top-16 right-0">
              <ul className="flex flex-col justify-evenly items-center cursor-pointer text-sm font-bold bg-gray-500 gap-2 border rounded-md">
                <li>Electronics</li>
                <li>Books</li>
                <li>Clothing</li>
                <li>Toys</li>
                <li>Sports</li>
              </ul>
            </div>
          )}
        </button>
      </div>
    </main>
  );
};

export default Navbar;
