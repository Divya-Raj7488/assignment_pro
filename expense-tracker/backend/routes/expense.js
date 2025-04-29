const express = require("express");
const router = express.Router();
const {
  getAllExpenses,
  createNewExpense,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");

router.route("").get(getAllExpenses);
router.route("").post(createNewExpense);
router.route("/:id").put(updateExpense);
router.route("/:id").delete(deleteExpense);

module.exports = router;
