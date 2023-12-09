import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/books/")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto my-8 px-5 sm:px-0">
      <h1 className="text-3xl font-semibold mb-4">List of Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
