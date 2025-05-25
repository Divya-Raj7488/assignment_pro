require("dotenv").config();
const express = require("express");
const app = express();
const corsOptions = require("./config/cors");

app.use(cors(corsOptions));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
