/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function EditBookForm({ bookId, formData, setFormData }) {
  const navigate = useNavigate();

  const handleEditBook = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/books/${bookId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Book edited successfully");
        setFormData({
          title: "",
          genre: "",
          pages: "",
        });
        navigate("/");
      } else {
        console.error("Book editation failed");
      }
    } catch (error) {
      console.error("Error during book editation:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleEditBook}>
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
        Edit Book
      </button>
    </form>
  );
}
