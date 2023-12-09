import { v4 as uuidv4 } from "uuid";
import { books } from "../db/books.js";
import { users } from "../db/users.js";

export async function getBooks(req, res) {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened wrong. Try again." });
  }
}

export async function getBookById(req, res) {
  const { bookId } = req.params;
  try {
    const book = books.find((book) => book.id == bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    } else {
      return res.status(200).json(book);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened wrong. Try again." });
  }
}

export async function createBook(req, res) {
  const book = req.body;
  const userId = req.user.id;
  try {
    const user = users.find((usr) => usr.id == userId);
    book.id = uuidv4();
    book.author = `${user.first_name} ${user.last_name}`;
    book.author_id = userId;
    books.push(book);
    return res.status(200).json(book);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened wrong. Try again." });
  }
}

export async function updateBook(req, res) {
  const newTitle = req.body.title;
  const newGenre = req.body.genre;
  const newPages = req.body.pages;
  const userId = req.user.id;
  const { bookId } = req.params;
  try {
    const book = books.find((book) => book.id == bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    } else {
      if (book.author_id != userId) {
        return res.status(403).json({
          message: "Access denied. Only author of this book can update it.",
        });
      } else {
        const updatedData = {
          title: newTitle,
          genre: newGenre,
          pages: newPages,
        };
        editBookById(bookId, updatedData);
        return res
          .status(200)
          .json({ message: "Successfuly updated the book." });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened wrong. Try again." });
  }
}

export async function deleteBook(req, res) {
  const userId = req.user.id;
  const { bookId } = req.params;
  try {
    const book = books.find((book) => book.id == bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    } else {
      if (book.author_id != userId) {
        return res.status(403).json({
          message: "Access denied. Only author of this book can delete it.",
        });
      } else {
        deleteBookById(bookId);
        return res
          .status(200)
          .json({ message: "Successfuly deleted the book." });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened wrong. Try again." });
  }
}

function editBookById(id, updatedBook) {
  const index = books.findIndex((book) => book.id === id);
  books[index] = { ...books[index], ...updatedBook };
}

function deleteBookById(id) {
  const index = books.findIndex((book) => book.id === id);
  books.splice(index, 1);
}
