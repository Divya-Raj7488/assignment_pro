"use client";
import Navbar from "../components/navbar";
import ProductList from "../components/productsList";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row">
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}
