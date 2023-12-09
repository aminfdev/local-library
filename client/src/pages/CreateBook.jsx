import { useState } from "react";
import CreateBookForm from "../components/CreateBookForm";

export default function CreateBook() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    pages: "",
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Book</h2>
      <CreateBookForm formData={formData} setFormData={setFormData} />
    </div>
  );
}
