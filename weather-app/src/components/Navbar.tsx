import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";

interface CityData {
  name: string;
  country: string;
  timezone: string;
}

interface NavbarProps {
  cityList: CityData[];
  cityListInDisplay: CityData[];
  setCityListInDisplay: React.Dispatch<React.SetStateAction<CityData[]>>;
}

const Navbar = ({
  cityList,
  cityListInDisplay,
  setCityListInDisplay,
}: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setCityListInDisplay(cityList);
    } else {
      const filteredCities = cityList.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCityListInDisplay(filteredCities);
    }
  }, [searchQuery, cityList, setCityListInDisplay]);

  const handleClearSearch = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800">City Explorer</h1>
        </div>

        <div className="w-full flex flex-row max-w-md mx-4 flex-grow gap-4">
          <div
            className={`relative flex items-center bg-gray-100 rounded-full transition-all ${
              isFocused ? "ring-2 ring-blue-500 bg-white" : "hover:bg-gray-200"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full py-2 px-3 bg-transparent outline-none text-gray-700 border-none"
              aria-label="Search cities"
            />
            <div className="pl-4 flex items-center justify-center text-gray-500 pr-2">
              <FiSearch className="h-5 w-5" />
            </div>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="pr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Clear search"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter cities"
            title="Filter cities"
          >
            <FiFilter className="h-5 w-5" />
          </button>
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sort cities"
            title="Sort cities"
          >
            <BiSortAlt2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
