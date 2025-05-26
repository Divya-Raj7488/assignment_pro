import { Calendar, Star, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bookDetailContext from "../../context/bookDetailContext";
import { useContext } from "react";

const BookCard = ({ book }) => {
  const { bookDetail, setBookDetail } = useContext(bookDetailContext);
  const navigate = useNavigate();
  const {
    _id: id,
    title,
    author,
    cover_url: cover,
    rating,
    publication_date: publishDate,
    genre,
  } = book;
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
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
        <img src={cover} alt={title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <UserCheck className="w-4 h-4 mr-1" />
          <span>{author}</span>
        </div>

        <div className="flex items-center mb-2">
          {renderStars(rating)}
          <span className="ml-1 text-sm text-gray-600">({rating})</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(publishDate)}</span>
        </div>

        <div className="mb-4">
          <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
            {genre}
          </span>
        </div>

        <button
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
          onClick={() => {
            setBookDetail(() => {
              return {
                id,
                title,
                author,
                cover,
                rating,
                publishDate: formatDate(publishDate),
                genre,
              };
            });
            setTimeout(() => {
              navigate(`/book/${id}`);
            }, 500);
          }}
        >
          Go to Reviews
        </button>
      </div>
    </div>
  );
};
export default BookCard;
