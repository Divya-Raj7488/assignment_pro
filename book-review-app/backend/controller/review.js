// Get all reviews for a specific book
const Review = require("../models/review");
const retrieveReviewForBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ bookId }).populate(
      "userId",
      "name email"
    );

    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve reviews", details: error.message });
  }
};

const addReviewForBook = async (req, res) => {
  const { bookId } = req.params;
  const { id, description, userId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });
    const newReview = new Review({
      id,
      description,
      bookId,
      userId,
      date: new Date(),
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add review", details: error.message });
  }
};

const updateReviewById = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const updatedReview = await Review.findOneAndUpdate(
      { id },
      { description, date: new Date() },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update review", details: error.message });
  }
};

module.exports = { retrieveReviewForBook, addReviewForBook, updateReviewById };
