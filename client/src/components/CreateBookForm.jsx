/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function CreateBookForm({ formData, setFormData }) {
  const navigate = useNavigate();

  const handleCreateBook = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Book created successfully");
        setFormData({
          title: "",
          genre: "",
          pages: "",
        });
        navigate("/");
      } else {
        console.error("Book creation failed");
      }
    } catch (error) {
      console.error("Error during book creation:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleCreateBook}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Pages</label>
        <input
          type="number"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <button
        disabled={!localStorage.getItem("token")}
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        Create Book
      </button>
      {!localStorage.getItem("token") && (
        <p className="text-red-600 mt-3">
          * To submit a book you must have logged in!
        </p>
      )}
    </form>
  );
}
