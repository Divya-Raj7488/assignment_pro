// get all book, get specific book, add new book,
const Book = require("../models/book");
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("reviews");
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch books", details: error.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findOne({ id }).populate("reviews");

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch book", details: error.message });
  }
};

const addNewBook = async (req, res) => {
  const { name, id, author, publishDate, rating, genre, coverImg } = req.body;

  try {
    const newBook = new Book({
      name,
      id,
      author,
      publishDate,
      rating,
      genre,
      coverUrl,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add new book", details: error.message });
  }
};

module.exports = { getAllBooks, getBookById, addNewBook };
