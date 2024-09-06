const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    Rating: String,
    category: String,
    image: String,
    title: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
