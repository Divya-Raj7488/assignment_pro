import React from "react";

const FilterOptions = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["Electronics", "Books", "Clothing", "Toys", "Sports"];
  return (
    <>
      <h2 className="font-semibold mb-2">Select Category:</h2>
      {categories.map((category) => (
        <label
          key={category}
          className="w-5/6 flex items-center gap-3 cursor-pointer"
        >
          <div className="relative w-5 h-5">
            <input
              type="radio"
              name="category"
              value={selectedCategory}
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
              className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-sm checked:bg-black"
            />
            <div className="pointer-events-none absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <span>{category}</span>
        </label>
      ))}
    </>
  );
};

export default FilterOptions;
