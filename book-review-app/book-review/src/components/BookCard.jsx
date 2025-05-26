import { Calendar, Star, UserCheck } from "lucide-react";

const BookCard = ({ book }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <UserCheck className="w-4 h-4 mr-1" />
          <span>{book.author}</span>
        </div>

        <div className="flex items-center mb-2">
          {renderStars(book.rating)}
          <span className="ml-1 text-sm text-gray-600">({book.rating})</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(book.publishDate)}</span>
        </div>

        <div className="mb-4">
          <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
            {book.genre}
          </span>
        </div>

        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200">
          Go to Reviews
        </button>
      </div>
    </div>
  );
};
export default BookCard;
