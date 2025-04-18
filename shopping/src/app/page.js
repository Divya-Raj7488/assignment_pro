"use client";
import React, { useEffect, useRef } from "react";
import productData from "../../data.json";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { AiFillFilter } from "react-icons/ai";
import FilterOptions from "@/components/filterOptions";
import "./globals.css";

export default function Home() {
  const [processedData, setProcessedData] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toggleCategory, setToggleCategory] = useState(false);
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
    const searched = productData.data.filter((item) =>
      item.name.toLowerCase().includes(searchParams.toLowerCase())
    );
    setProcessedData(searched);
    processedDataRef.current = searched;
    setProducts(searched.slice(0, 50));
  }, [searchParams]);

  useEffect(() => {
    const filtered = productData.data.filter((item) =>
      item.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    setProcessedData(filtered);
    processedDataRef.current = filtered;
    setProducts(filtered.slice(0, 50));
  }, [selectedCategory]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <div className="w-screen flex flex-col items-center">
      <Navbar setSearchParams={setSearchParams} />
      <div className="w-full h-full flex flex-row justify-evenly pt-3 px-4">
        <div className="filterIcon">
          <AiFillFilter
            className="w-8 h-8 cursor-pointer"
            onClick={() => setToggleCategory(!toggleCategory)}
          />
          {toggleCategory && (
            <div className="filterMenu">
              <FilterOptions
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          )}
        </div>
        <div className="filterOptions w-40 h-screen flex flex-col items-center border rounded-md sticky top-15 py-2">
          <FilterOptions
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="flex-1 flex flex-row justify-evenly items-center flex-wrap gap-4 overflow-y-scroll">
          {products.map(
            ({ id, name, description, rating, price, category }) => {
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
            }
          )}
        </div>
      </div>
    </div>
  );
}
