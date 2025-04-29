const express = requier("express");
const router = express.Router();
const {
  getAllExpenses,
  createNewExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.route("/expenses").get(getAllExpenses);
router.route("/expenses").post(createNewExpense);
router.route("/expenses/:id").get(updateExpense);
router.route("/expenses/:id").delete(deleteExpense);
