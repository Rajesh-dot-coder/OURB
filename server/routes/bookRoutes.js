import express from "express";
import Book from "../models/Book.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE a book (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { title, author, description, price, condition, category, imageUrl } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      price,
      condition,
      category,
      imageUrl,
      sellerId: req.userId,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET all books (public)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({ isSold: false }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET a single book by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE a book (protected, only the owner)
router.put("/:id", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.sellerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to edit this book" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE a book (protected, only the owner)
router.delete("/:id", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.sellerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this book" });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;