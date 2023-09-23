const express = require("express");
const { BookModel } = require("../model/book.model");
const BookRoute = express.Router();

// Add Book API
BookRoute.post("/add", async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Retrieve Books API
BookRoute.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    let sort = {};
    if (req.query.sortByPrice) {
      sort.price = req.query.sortByPrice;
    }
    const books = await BookModel.find(query).sort(sort);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete Book API
BookRoute.delete("/del/:id", async (req, res) => {
  try {
    const book = await BookModel.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.send("Book deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Filter Books API
BookRoute.get("/filter", async (req, res) => {
  try {
    const books = await BookModel.find({ genre: req.query.genre });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Sort Books API
BookRoute.get("/sort", async (req, res) => {
  try {
    const sort = {};
    sort[req.query.sortBy] = req.query.order;
    const books = await BookModel.find().sort(sort);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = { BookRoute };
