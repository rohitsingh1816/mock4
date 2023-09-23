// const mongoose = require('mongoose')

// const BookSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//       },
//       author: {
//         type: String,
//         required: true,
//       },
//       genre: {
//         type: String,
//         enum: ['Fiction', 'Science', 'Comic'],
//         required: true,
//       },
//       description: {
//         type: String,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
// })

// const BookModel = mongoose.model("books", BookSchema)

// module.exports = {
//     BookModel
// }

const express = require("express");
const { BookModel } = require("../models/book.model");

const bookRouter = express.Router();

bookRouter.get("/get", async (req, res) => {
    try {
        const { genre } = req.query;

        let filter = {}
        
        if (genre) {
            filter = { genre };
        }
        const books = await BookModel.find();
        res.send(books);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

bookRouter.post("/add", async (req, res) => {
    try {
        const { title, author, genre, description, price } = req.body;

        const ifBookPresent = await BookModel.findOne({ title, author });
        if (ifBookPresent) {
            return res.status(400).json({ msg: "Book already present" });
        } else {
            const addBook = new BookModel({ title, author, genre, description, price });
            await addBook.save();

            res.send({ msg: "Book added successfully" });
         }
    } catch (err) {
        res.status(500).send({ msg: "Could not add book", error: err.message });
    }
});

bookRouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        await BookModel.findByIdAndDelete({_id:id});
        res.send({msg: "Book deleted"});
    } catch (err) {
        res.status(500).send({ msg: "Could not delete book", error: err.message });
    }
});


module.exports = {
    bookRouter
};