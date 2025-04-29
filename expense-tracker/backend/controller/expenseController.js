const expenseModel = require("../models/expenseModel.js");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find({});
    console.log(expenses);
    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const createNewExpense = async (req, res) => {
  try {
    const { userId, name, amount, category } = req.body;
    if (!userId || !name || !amount) {
      return res.status(400).json({
        success: false,
        error: "Please provide userId, name, and amount",
      });
    }

    const expense = await expenseModel.create({
      userId,
      name,
      amount,
      category,
    });
    console.log(expense);
    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { userId, name, amount, cetegory } = req.body;
    const updateData = {};
    if (userId !== undefined) updateData.userId = userId;
    if (name !== undefined) updateData.name = name;
    if (amount !== undefined) updateData.amount = amount;
    if (cetegory !== undefined) updateData.cetegory = cetegory;

    const expense = await expenseModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: "No expense found with that ID",
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({
        success: false,
        error: messages,
      });
    } else if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: "This userId is already in use by another expense",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
const deleteExpense = async (req, res) => {
  try {
    const expense = await expenseModel.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: "No expense found with that ID",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  getAllExpenses,
  createNewExpense,
  updateExpense,
  deleteExpense,
};
