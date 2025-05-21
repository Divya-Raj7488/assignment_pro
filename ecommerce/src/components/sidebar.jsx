"use client";

import { ChevronLeft } from "lucide-react";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  isMobile,
  filterParams,
  setFilterParams,
}) => {
  return (
    <aside
      className={`sidebarContainer bg-white shadow-md ${
        isMobile
          ? isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          : "translate-x-0"
      } transition-transform duration-300 fixed md:relative top-0 left-0 h-screen md:h-auto z-40 w-64 overflow-y-auto pt-20 md:pt-4`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h3 className="font-bold text-lg">Filters</h3>
          <button onClick={toggleSidebar} className="text-gray-600">
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
          <div className="space-y-2">
            {[
              "Electronics",
              "Clothing",
              "Home & Kitchen",
              "Beauty",
              "Books",
              "Toys",
              "Sportswear",
              "Sports",
            ].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  className="mr-2"
                  value={filterParams.category}
                  onClick={() => {
                    setFilterParams((prev) => {
                      return {
                        ...prev,
                        category: [...prev.category, category.toLowerCase()],
                      };
                    });
                  }}
                />
                <label htmlFor={category} className="text-gray-600">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            value={filterParams.priceRange[1]}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              console.log(value);
              setFilterParams((prev) => {
                return { ...prev, priceRange: [0, value] };
              });
            }}
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(filterParams
                .priceRange[1] /
                1000) *
                100}%, #ffffff ${(filterParams.priceRange[1] / 1000) *
                100}%, #ffffff 100%)`,
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">$0</span>
            <span className="text-sm text-gray-600">
              ${filterParams.priceRange[1]}
            </span>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Brands</h3>
          <div className="space-y-2">
            {["Apple", "Samsung", "Sony", "Nike", "Adidas"].map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={brand}
                  className="mr-2"
                  value={filterParams.brand}
                  onClick={() => {
                    setFilterParams((prev) => {
                      return {
                        ...prev,
                        brand: [...prev.brand, brand.toLowerCase()],
                      };
                    });
                  }}
                />
                <label htmlFor={brand} className="text-gray-600">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
