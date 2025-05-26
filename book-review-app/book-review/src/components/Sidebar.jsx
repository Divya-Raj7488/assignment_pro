import { Star } from "lucide-react";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  selectedRatings,
  selectedGenres,
  setSelectedRatings,
  setSelectedGenres,
}) => {
  const genres = ["Fiction", "Romance", "Comedy", "Tragedy", "Drama", "Horror"];
  const ratings = [1, 2, 3, 4, 5];

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };
  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Rating</h3>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="ml-2 flex items-center">
                      {renderStars(rating)}
                      <span className="ml-1 text-sm text-gray-600">
                        ({rating})
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Genre Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Genre</h3>
              <div className="space-y-2">
                {genres.map((genre) => (
                  <label
                    key={genre}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedRatings.length > 0 || selectedGenres.length > 0) && (
              <button
                onClick={() => {
                  setSelectedRatings([]);
                  setSelectedGenres([]);
                }}
                className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
