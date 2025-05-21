"use client";
import Navbar from "../components/navbar";
import ProductList from "../components/productsList";
import Footer from "../components/footer";
import { useState } from "react";

export default function Home() {
  const [filterParams, setFilterParams] = useState({
    category: [],
    priceRange: [0, 1000],
    brand: [],
  });
  const [searchParams, setSearchParams] = useState("");
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className="flex flex-1 flex-col md:flex-row">
        <ProductList
          filterParams={filterParams}
          searchParams={searchParams}
          setFilterParams={setFilterParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <Footer />
    </div>
  );
}
