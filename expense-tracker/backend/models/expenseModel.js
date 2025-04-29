const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const expenseSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false,
    default: "",
  },
});

const expenseModel = model("Expense", expenseSchema);
module.exports = expenseModel;
