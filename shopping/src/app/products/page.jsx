"use client";
import React, { useEffect } from "react";
import { data } from "../../../data.json";
import ProductCard from "../../components/ProductCard";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const main = () => {
  const [products, setProducts] = useState(data.slice(0, 50));
  const imgList = {
    Electronics: "/electronics.jpg",
    Books: "/books.jpg",
    Clothing: "/clothes.jpg",
    Toys: "/toys.jpg",
    Sports: "/sports.jpg",
  };
  const checkScrollPosition = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 100) {
      setProducts((prev) => {
        const nextProducts = data.slice(prev.length, prev.length + 100);
        if (nextProducts.length === 0) return prev;
        return [...prev, ...nextProducts];
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);
  return (
    <div className="w-full h-full flex flex-row justify-evenly items-center flex-wrap gap-4 pt-3">
      <Navbar />
      {products.map(({ id, name, description, rating, price, category }) => {
        return (
          <ProductCard
            key={id}
            id={id}
            name={name}
            price={price}
            description={description}
            imgUrl={category ? imgList[category] : "electronics.jpg"}
            rating={rating}
          />
        );
      })}
    </div>
  );
};

export default main;
