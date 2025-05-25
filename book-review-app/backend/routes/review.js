const express = require("express");
const router = express.Router();
const {
  retrieveReviewForBook,
  addReviewForBook,
  updateReviewById,
} = require("../controller/review");

router.route("/").get(retrieveReviewForBook);
router.route("/").post(updateReviewById);
router.put("/:id").put(addReviewForBook);

module.exports = router;
