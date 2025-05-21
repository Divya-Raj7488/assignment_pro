"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Sidebar from "./sidebar";
import Products from "../../products.json";
import Searchbar from "./searchbar";
import ProductCard from "./productCard";

const ProductList = ({
  filterParams,
  searchParams,
  setFilterParams,
  setSearchParams,
}) => {
  const [productsList, setProductsList] = useState([]);
  const [productsInDisplay, setProductsInDisplay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setProductsList([...Products]);
    fetchProducts();
  }, []);

  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
    setSidebarOpen(window.innerWidth >= 768);
  };
  const fetchProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setProductsInDisplay((prev) => {
        if (!prev || prev.length === 0) {
          return productsList.slice(0, 100);
        } else {
          let len = prev.length;
          let newProducts = productsList.slice(len, len + 100);
          return [...prev, ...newProducts];
        }
      });
      setLoading(false);
    }, 800);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filterData = () => {
    const data = [...Products];
    const filteredData = data.filter((product) => {
      const isCategory = filterParams.category.length
        ? filterParams.category.includes(product.category.toLowerCase())
        : true;
      const isPriceRange =
        product.price >= filterParams.priceRange[0] &&
        product.price <= filterParams.priceRange[1];
      const isBrand = filterParams.brand.length
        ? filterParams.brand.includes(product.brand.toLowerCase)
        : true;
      return isCategory && isPriceRange && isBrand;
    });
    setProductsList(filteredData);
    setProductsInDisplay(filteredData.slice(0, 100));
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const handleObserver = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px 200px 0px",
    });

    const loadingElement = document.getElementById("load-more-trigger");
    if (loadingElement) {
      observer.current.observe(loadingElement);
    }

    return () => {
      if (loadingElement) {
        observer.current.unobserve(loadingElement);
      }
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
  }, [page]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filteredData = Products.filter((product) => {
        return product.title
          .toLowerCase()
          .includes((searchParams || "").toLowerCase());
      });

      setProductsList(filteredData);
      setProductsInDisplay(filteredData.slice(0, 100));
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      filterData();
    }, 500);
    return () => clearTimeout(timeout);
  }, [filterParams]);

  return (
    <div className="w-screen h-screen flex flex-row overflow-hidden bg-gray-100 pt-4">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />

      <main className="flex-1 p-4 overflow-y-auto max-h-screen">
        <div className="mb-4 flex justify-between items-center">
          {/* expand/collapse button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="bg-white p-2 rounded-md shadow text-gray-700"
            >
              {sidebarOpen ? (
                <ChevronLeft size={24} />
              ) : (
                <ChevronRight size={24} />
              )}
            </button>
          )}

          {isMobile && (
            <Searchbar
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          )}
          {/* product count */}
          <div className="hidden md:block">
            <span className="text-gray-600">
              Showing {Products.length} products
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsInDisplay.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        {/* loader */}
        {loading && productsInDisplay.length < productsList.length && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
        {/* product list ends */}
        {!loading && productsInDisplay.length >= productsList.length && (
          <div className="w-full h-16 flex justify-center items-center text-gray-500 text-lg">
            You have scrolled to end...
          </div>
        )}
        {productsList.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">
            No product found
          </div>
        )}
        <div id="load-more-trigger" className="h-4"></div>
      </main>
    </div>
  );
};

export default ProductList;
