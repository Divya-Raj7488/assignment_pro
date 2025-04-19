"use client";
import React, { use, useEffect, useState } from "react";
import ProductData from "../../../../data.json";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

const ProductDetails = ({ params }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState({});
  const { id } = use(params);
  useEffect(() => {
    const item = ProductData.data[id - 1];
    setProduct(item);
  }, []);
  const imgList = {
    Electronics: "/electronics.jpg",
    Books: "/books.jpg",
    Clothing: "/clothes.jpg",
    Toys: "/toys.jpg",
    Sports: "/sports.jpg",
  };
  const addToWishlist = () => {
    if (!product) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isInWishlist = wishlist.some((item) => item.id === product.id);

    if (!isInWishlist) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
    } else {
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    }
  };

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity ? item.quantity + 1 : 2 }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cartItems", JSON.stringify(cart));
    }
    setAddedToCart(true);
  };

  if (!product)
    return <div className="p-6 text-center">Loading product...</div>;

  return (
    <div className="w-screen min-h-screen flex flex-col justify-evenly items-center md:flex-row">
      <div className="w-full h-[90vh] md:w-1/2 border rounded-md flex flex-col">
        <div className="w-full h-[80%]">
          <Image
            src={imgList[product.category] ?? imgList["Electronics"]}
            alt="product"
            width={200}
            height={200}
            className="w-full h-full border rounded-md"
          />
        </div>
        <div className="w-full h-8 text-lg font-bold px-3">{product.name}</div>
        <div className="w-full h-8 font-bold px-3 flex justify-between items-center">
          <span>{product.price}</span>
          <span className="flex items-center gap-1">
            <span>{product.rating}</span>
            <span>
              <IoStar className="w-4 h-4" />
            </span>
          </span>
        </div>
      </div>
      <div className="w-full h-[90vh] md:w-[45%] flex flex-col justify-between border rounded-md">
        <div className="w-full h-3/4 px-4 py-4 flex flex-col gap-4">
          <p className="text-sm ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
            accusantium omnis alias. Iusto adipisci numquam molestias ullam,
            repellat corporis eligendi voluptatem fugiat, sed aliquid non
            distinctio at necessitatibus explicabo maiores!
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
            accusantium omnis alias. Iusto adipisci numquam molestias ullam,
            repellat corporis eligendi voluptatem fugiat, sed aliquid non
            distinctio at necessitatibus explicabo maiores!
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
            accusantium omnis alias. Iusto adipisci numquam molestias ullam,
          </p>
        </div>
        <div className="flex justify-between px-4 py-2">
          <button onClick={addToWishlist}>
            <AiFillHeart
              className={`w-6 h-6 ${
                !isWishlisted ? `text-white` : "text-red-600"
              } cursor-pointer`}
            />
          </button>
          {!addedToCart ? (
            <button
              className="addToCart flex flex-row gap-3 items-center border border-white rounded-md px-2 py-3 cursor-pointer"
              onClick={addToCart}
            >
              {" "}
              <span>Add to Cart</span>{" "}
              <AiOutlineShoppingCart className="w-6 h-6 cursor-pointer " />
            </button>
          ) : (
            <Link
              className="addToCart flex flex-row gap-3 items-center border border-white rounded-md px-2 py-3 cursor-pointer"
              href="/cart"
            >
              <span>Go to Cart</span>{" "}
              <AiOutlineShoppingCart className="w-6 h-6 cursor-pointer " />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
