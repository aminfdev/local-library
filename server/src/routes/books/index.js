import {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
  } from "../../controllers/booksController.js";
  import { authenticate } from "../../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/", getBooks);
router.get("/:bookId", getBookById);
router.post("/", authenticate, createBook);
router.put("/:bookId", authenticate, updateBook);
router.delete("/:bookId", authenticate, deleteBook);

export { router as booksRouter };