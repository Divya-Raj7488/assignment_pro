const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("connection successful");
  } catch (err) {
    console.log(err);
  }
};

module.exports = DbConnect;
