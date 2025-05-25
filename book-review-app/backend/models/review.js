// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
