import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditBookForm from "../components/EditBookForm";

export default function CreateBook() {
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    pages: "",
  });

  const { bookId } = useParams();

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:3000/api/books/${bookId}`)
        .then((response) => response.json())
        .then((data) => setBook(data))
        .catch((error) => console.error(error));
      setFormData({
        title: book.title,
        genre: book.genre,
        pages: book.pages,
      });
    };
    fetchData();
  }, [book.genre, book.pages, book.title, bookId, navigate]);


  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
      <EditBookForm
        bookId={bookId}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
