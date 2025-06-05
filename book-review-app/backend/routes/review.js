const express = require("express");
const router = express.Router();
const {
  retrieveReviewForBook,
  addReviewForBook,
  updateReviewById,
} = require("../controller/review");

router.get("/", retrieveReviewForBook);
router.post("/:bookId", addReviewForBook);
router.put("/:id", updateReviewById);

module.exports = router;
