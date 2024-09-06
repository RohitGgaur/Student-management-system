const express = require('express');
const router = express.Router();
const Book = require('../../UserSchema/book');

// Route to get books based on the branch/category
router.get('/books/:category', async (req, res) => {
  try {
    const category = req.params.category; // Correctly access the category from the route parameters
    const books = await Book.find({ category: category }); // Query the Book model with the category
    res.json(books);
  } catch (err) {
    res.status(500).send(err); // Return a 500 error if something goes wrong
  }
});

module.exports = router;

