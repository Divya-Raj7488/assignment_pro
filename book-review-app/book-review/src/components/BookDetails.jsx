import React, { useState, useEffect, useContext } from "react";
import {
  Star,
  Calendar,
  BookOpen,
  User,
  MessageCircle,
  X,
  Send,
} from "lucide-react";
import bookDetailContext from "../context/bookDetailContext";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const StarRating = ({ rating, size = 20 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : index === fullStars && hasHalfStar
              ? "fill-yellow-400 text-yellow-400 opacity-50"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{review.userName}</h4>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(review.date)}
            </p>
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{review.description}</p>
    </div>
  );
};
const ReviewModal = ({ isOpen, onClose, bookId, onReviewSubmitted }) => {
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || reviewText.length < 10) return;

    setIsSubmitting(true);
    try {
      // Replace with your actual API call
      const newReview = {
        id: `review_${Date.now()}`,
        description: reviewText,
        bookId: bookId,
        userId: "current_user_id", // Replace with actual user ID
        date: new Date().toISOString(),
        userName: "Current User", // Replace with actual user name
      };

      // Simulate API call
      setTimeout(() => {
        onReviewSubmitted(newReview);
        setReviewText("");
        setIsSubmitting(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReviewText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Write a Review</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              type="button"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Share your thoughts about this book
              </label>
              <textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you think about this book? Share your experience..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none outline-none transition-colors"
                required
                disabled={isSubmitting}
              />
              <div className="mt-2 text-right">
                <span
                  className={`text-sm ${
                    reviewText.length < 10 ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {reviewText.length} characters{" "}
                  {reviewText.length < 10 && "(minimum 10)"}
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || reviewText.length < 10}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const BookDetails = () => {
  const { bookDetail: book } = useContext(bookDetailContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const formattedPublishDate = formatDate(book.publishDate);

  const handleReviewSubmitted = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setReviews(reviews.filter((review) => review.bookId === book.id));
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    if (book.id) {
      fetchReviews();
    }
  }, [book.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 lg:w-1/4">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 lg:w-3/4 p-8">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {book.genre}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <StarRating rating={book.rating} size={24} />
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={20} />
                  <span>Published: {formattedPublishDate}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen size={20} />
                  <span>Genre: {book.genre}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle size={28} className="text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Reader Reviews</h2>
            <span className="bg-blue-100 text-blue-800 text-lg font-medium px-3 py-1 rounded-full">
              {reviews.length}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageCircle size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-500">
                Be the first to share your thoughts about this book!
              </p>
            </div>
          )}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={openReviewModal}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Write a Review
            </button>
          </div>
        </div>
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={closeReviewModal}
          bookId={book.id}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>
    </div>
  );
};

export default BookDetails;
