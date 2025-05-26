require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = require("./config/cors");
const dbConfig = require("./config/dbConfig");

app.use(cors(corsOptions));
dbConfig();
app.use(express.json());
app.use("/books", require("./routes/books"));
app.use("/user", require("./routes/user"));
app.use("/review", require("./routes/review"));

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
