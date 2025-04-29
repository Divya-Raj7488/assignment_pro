const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const expenseSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  cetegory: {
    type: String,
    required: false,
    default: "",
  },
});

const expenseModel = model("User", expenseSchema);
module.exports = expenseModel;
