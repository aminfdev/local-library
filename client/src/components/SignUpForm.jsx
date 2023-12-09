/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useState } from "react";

export default function SignUpForm({ formData, setFormData }) {
  const [isFetching, setIsFetching] = useState(false);

  const { setIsAuthed, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    setIsFetching(false);
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("id", data.usr.id);
        setUser({
          id: data.usr.id,
          first_name: data.usr.first_name,
          last_name: data.usr.last_name,
          email: data.usr.email,
        });
        setIsAuthed(true);
        setIsFetching(false);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        navigate("/");
        console.log("Sign up successful");
      } else {
        setIsFetching(false);
        console.error("Sign up failed");
      }
    } catch (error) {
      setIsFetching(false);
      console.error("Error during signup:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <button
        disabled={isFetching}
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        Sign Up
      </button>
    </form>
  );
}
