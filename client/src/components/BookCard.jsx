/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const [wantToDelete, setWantToDelete] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/books/${book.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Book deleted successfully");
        setWantToDelete(false);
        navigate(0);
      } else {
        console.error("Book deleting failed");
      }
    } catch (error) {
      console.error("Error during deleting book:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md h-[170px]">
      <h2 className="text-lg font-semibold mb-2">Title: {book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Pages: {book.pages}</p>
      <p className="text-gray-600">Genre: {book.genre}</p>
      {localStorage.getItem("id") == book.author_id && (
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => navigate(`/edit/${book.id}`)}
            className="px-3 py-1 rounded-md text-white text-sm bg-slate-500"
          >
            Edit
          </button>
          <button
            onClick={() => setWantToDelete(true)}
            className="px-3 py-1 rounded-md text-white text-sm bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
      {wantToDelete && (
        <div
          style={{ backgroundColor: "rgba(0.25, 0.25, 0.25, 0.5)" }}
          className="fixed top-0 right-0 w-screen h-screen flex justify-center"
        >
          <div className="absolute top-36 w-80 h-40 p-5 flex flex-col justify-between bg-white rounded-md shadow-xl">
            <span className="self-center font-semibold">
              Are you sure want to delete this book?
            </span>
            <div className="flex justify-between items-center gap-3 mt-5">
              <button
                onClick={handleDelete}
                className="w-full py-2 rounded-md text-white bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setWantToDelete(false);
                }}
                className="w-full py-2 rounded-md text-white bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
