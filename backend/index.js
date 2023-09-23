const express = require("express");

const { connection } = require("./db");
var cors = require("cors");
const { BookRoute } = require("./routes/book.route");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/book", BookRoute);

app.get("/", (req, res) => {
  res.send("Connected");
});

app.listen(5500, async () => {
  try {
    await connection;
    console.log("server listening on port 5500");
  } catch (error) {
    console.log("DB is Disconnected");
  }
});
