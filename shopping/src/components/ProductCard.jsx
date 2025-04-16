import Image from "next/image";
import React from "react";
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
        <button>
          <AiFillHeart className="w-6 h-6 text-red-600 cursor-pointer" />
        </button>
        <button className="addToCart flex flex-row gap-3 items-center border border-white rounded-md px-2 py-3 cursor-pointer">
          {" "}
          <span>Add to Cart</span>{" "}
          <AiOutlineShoppingCart className="w-6 h-6 cursor-pointer " />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
