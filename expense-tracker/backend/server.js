require("dotenv").config();
const express = require("express");
const DbConnect = require("./config/dbConfig");
const cors = require("cors");
const corsOptions = require("./config/cors");
const app = express();

DbConnect();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/expenses", require("./routes/expense"));

app.listen(process.env.PORT, () => {
  console.log(`app is listening on port 3000`);
});
app.get("/", (req, res) => {
  res.send("<h1>hey there</h1>");
});
