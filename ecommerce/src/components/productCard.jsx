"use client";
import { MyContext } from "../context/createContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const [addedToCart, setaddedToCart] = useState(false);
  const { cartItems, setCartItems } = useContext(MyContext);
  const router = useRouter();
  const imageArr = {
    Electronics: "/electronics.jpg",
    Clothing: "/clothes.jpg",
    "Home & Kitchen": "/homeKitchen.jpg",
    Beauty: "/beauty.jpg",
    Books: "/books.jpg",
    Toys: "/toys.jpg",
    Sportswear: "/sportswear.jpg",
    Sports: "/sports.jpg",
  };
  const addToCart = (product) => {
    const isItemPresent = cartItems.find((item) => item.id === product.id);
    if (!isItemPresent) {
      const newItem = { ...product, quantity: 1 };
      setCartItems((prev) => {
        return [...prev, newItem];
      });
    } else {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    }
    setaddedToCart(true);
  };
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative pb-2/3">
          <img
            src={imageArr[product.category]}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {product.title}
          </h3>
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating}</span>
          </div>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">${product.price}</p>
          {!addedToCart ? (
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300"
            >
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => router.push("/cart")}
              className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300"
            >
              Go to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
