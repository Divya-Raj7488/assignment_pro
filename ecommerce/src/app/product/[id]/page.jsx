"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import Products from "../../../../products.json";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          className={`${
            i < fullStars
              ? "text-yellow-500 fill-yellow-500"
              : i === fullStars && hasHalfStar
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating} (128 reviews)</span>
    </div>
  );
};

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});

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
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  useEffect(() => {
    const data = Products.find((product) => {
      return product.id === id;
    });
    setProduct(data);
    console.groupCollapsed(data, id, "hhh");
  }, [id]);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="mb-6">
          <ol className="flex text-sm text-gray-500">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="mx-2">/</li>
            <li className="hover:text-blue-600 cursor-pointer">
              {product.category}
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-800">{product.title}</li>
          </ol>
        </nav>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
              <img
                src={imageArr[product.category]}
                alt={product.title}
                className="max-h-96 object-contain"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start">
                <div className="mb-2 text-sm font-medium text-blue-600">
                  {product.brand}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Heart size={20} className="text-gray-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Share2 size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>

              <div className="mb-4">
                <RatingStars rating={product.rating} />
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="ml-2 text-sm text-green-600">In Stock</span>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6">
                <div className="text-gray-800 mb-2">Quantity</div>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <div className="px-4 py-1 border-t border-b border-gray-300 text-center">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors">
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                <button className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md font-medium transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="w-24">Product ID:</span>
                  <span>{product.id}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="w-24">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-24">Brand:</span>
                  <span>{product.brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
