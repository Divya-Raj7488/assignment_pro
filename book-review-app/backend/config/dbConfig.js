const mongoose = require("mongoose");

const dbConfig = async () => {
  try {
    const response = await mongoose.connect(process.env.DATABASE_URI);
    if (response) {
      console.log("connection established");
    }
  } catch (err) {
    console.log(err);
  }
};
export default dbConfig;
