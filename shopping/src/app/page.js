"use client";
import React, { useEffect, useRef } from "react";
import productData from "../../data.json";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [processedData, setProcessedData] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const processedDataRef = useRef([]);

  const imgList = {
    Electronics: "/electronics.jpg",
    Books: "/books.jpg",
    Clothing: "/clothes.jpg",
    Toys: "/toys.jpg",
    Sports: "/sports.jpg",
  };

  useEffect(() => {
    const data = productData.data;
    setProcessedData(data);
    processedDataRef.current = data;
    setProducts(data.slice(0, 50));
  }, []);

  const checkScrollPosition = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 100) {
      setProducts((prev) => {
        const nextStart = prev.length;
        const nextProducts = processedDataRef.current.slice(
          nextStart,
          nextStart + 100
        );

        if (nextProducts.length === 0) return prev;
        return [...prev, ...nextProducts];
      });
    }
  };
  useEffect(() => {
    const filtered = productData.data.filter((item) =>
      item.name.toLowerCase().includes(searchParams.toLowerCase())
    );
    setProcessedData(filtered);
    processedDataRef.current = filtered;
    setProducts(filtered.slice(0, 50));
  }, [searchParams]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <div className="w-screen flex flex-col items-center">
      <Navbar setSearchParams={setSearchParams} />
      <div className="w-full h-full flex flex-row justify-evenly items-center flex-wrap gap-4 pt-3">
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
    </div>
  );
}
