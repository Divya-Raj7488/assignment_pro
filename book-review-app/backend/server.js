require("dotenv").config();
const express = require("express");
const app = express();
const corsOptions = require("./config/cors");
const dbConfig = require("./config/dbConfig");

app.use(cors(corsOptions));
dbConfig();
app.use("/books/", require("./routes/books"));
app.use("/user", require("./routes/user"));
app.use("/review", require("./routes/review"));

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
  return res.send("Hello");
});
