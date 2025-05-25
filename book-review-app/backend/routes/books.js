const express = require("express");
const router = express.Router();
const { getAllBooks, getBookById, addNewBook } = require("../controller/book");

router.route("/").get(getAllBooks);
router.route("/:id").get(getBookById);
router.route("/").post(addNewBook);
module.exports = router;
