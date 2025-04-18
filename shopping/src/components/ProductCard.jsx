"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({
  id,
  name,
  description,
  rating,
  price,
  category,
  imgUrl,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = wishlist.some((item) => item.id === id);
    if (!isProductInWishlist) {
      wishlist.push({ id, name, description, rating, price, category, imgUrl });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    setIsWishlisted(!isWishlisted);
  };
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isProductInCart = cart.some((item) => item.id === id);
    if (!isProductInCart) {
      cart.push({
        id,
        name,
        description,
        rating,
        price,
        category,
        imgUrl,
        quantity: 1,
      });
      localStorage.setItem("cartItems", JSON.stringify(cart));
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };
  return (
    <div
      className="w-88 h-80 border border-gray-500 rounded-md flex flex-col gap-2"
      key={id}
    >
      <div className="ImgContainer w-full h-1/2">
        <Image
          src={imgUrl}
          width={100}
          height={100}
          className="w-full h-full"
          alt={category ?? "product"}
        />
      </div>
      <div className="w-full h-4 flex flex-row justify-between px-4">
        {name}
      </div>
      <div className="w-full h-4 flex flex-row justify-between px-4">
        <span>{price}</span>
        <span>{rating}</span>
      </div>
      <div className="px-4 h-12">{description}</div>
      <div className="w-full h-8 flex flex-row justify-between px-4">
        <button onClick={addToWishlist}>
          <AiFillHeart
            className={`w-6 h-6 ${
              !isWishlisted ? `text-white` : "text-red-600"
            } cursor-pointer`}
          />
        </button>
        <button
          className="addToCart flex flex-row gap-3 items-center border border-white rounded-md px-2 py-3 cursor-pointer"
          onClick={addToCart}
        >
          {" "}
          <span>Add to Cart</span>{" "}
          <AiOutlineShoppingCart className="w-6 h-6 cursor-pointer " />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
