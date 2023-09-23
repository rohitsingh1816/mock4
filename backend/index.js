const express = require("express");
const connection = require("./config/db");
const { bookRouter } = require("./routes/book.routes");
require('dotenv').config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Book App");
});

app.use("/", bookRouter);

const PORT = process.env.port||8080; 
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
        console.log("Error to connect the database");
    }
    console.log(`Server listening on port ${PORT}`);
});