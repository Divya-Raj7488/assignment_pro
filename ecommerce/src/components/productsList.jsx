"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "./sidebar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const fetchProducts = (pageNum) => {
    setLoading(true);
    setTimeout(() => {
      const newProducts = Array.from({ length: 100 }, (_, i) => ({
        id: (pageNum - 1) * 100 + i + 1,
        title: `Product ${(pageNum - 1) * 100 + i + 1}`,
        price: Math.floor(Math.random() * 500) + 10,
        image: `/api/placeholder/300/300`,
        rating: (Math.random() * 2 + 3).toFixed(1),
      }));
      setProducts((prev) => [...prev, ...newProducts]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchProducts(page);
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
  }, [loading]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-screen h-screen flex flex-row overflow-hidden bg-gray-100 pt-4">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <main className="flex-1 p-4 overflow-y-auto max-h-screen">
        <div className="mb-4 flex justify-between items-center">
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
          <div className="hidden md:block">
            <span className="text-gray-600">
              Showing {products.length} products
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative pb-2/3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{product.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
        <div id="load-more-trigger" className="h-4"></div>
      </main>
    </div>
  );
};

export default ProductList;
