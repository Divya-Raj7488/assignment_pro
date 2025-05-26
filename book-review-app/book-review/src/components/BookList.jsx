import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import Sidebar from "./subcomponents/Sidebar";
import BookCard from "./subcomponents/BookCard";
import Navbar from "./subcomponents/Navbar";
import Pagination from "./subcomponents/Pagination";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const booksPerPage = 25;
  const filteredBooks = useMemo(() => {
    if (books.length === 0) return [];
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes(Math.floor(book.rating));
      const matchesGenre =
        selectedGenres.length === 0 || selectedGenres.includes(book.genre);

      return matchesSearch && matchesRating && matchesGenre;
    });
  }, [books, searchTerm, selectedRatings, selectedGenres]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  const getBookData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books");
      console.log(response.data);
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRatings, selectedGenres]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            selectedRatings={selectedRatings}
            selectedGenres={selectedGenres}
            setSelectedRatings={setSelectedRatings}
            setSelectedGenres={setSelectedGenres}
          />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            selectedRatings={selectedRatings}
            selectedGenres={selectedGenres}
            setSelectedRatings={setSelectedRatings}
            setSelectedGenres={setSelectedGenres}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Mobile Search Bar */}
          <div className="min-[800px]:hidden mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Results Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredBooks.length} Books Found
            </h2>
            {(selectedRatings.length > 0 ||
              selectedGenres.length > 0 ||
              searchTerm) && (
              <p className="text-gray-600 mt-1">
                {searchTerm && `Searching for "${searchTerm}"`}
                {(selectedRatings.length > 0 || selectedGenres.length > 0) &&
                  ` • Filtered by ${[
                    ...selectedGenres,
                    ...selectedRatings.map(
                      (r) => `${r} star${r > 1 ? "s" : ""}`
                    ),
                  ].join(", ")}`}
              </p>
            )}
          </div>
          <div className="w-full h-[75vh] flex-row justify-evenly flex-wrap overflow-y-auto">
            <div>
              {currentBooks.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
                    {currentBooks.map((book) => (
                      <BookCard key={book._id} book={book} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={setCurrentPage}
                      filteredBooks={filteredBooks}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    No books found matching your criteria
                  </div>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedRatings([]);
                      setSelectedGenres([]);
                    }}
                    className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
