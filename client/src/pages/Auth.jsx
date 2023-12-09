/* eslint-disable no-unused-vars */

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function Auth() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleToggleForm = () => {
    setIsLoginForm((prevState) => !prevState);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {isLoginForm ? "Login" : "Sign Up"}
      </h2>
      {isLoginForm ? (
        <LoginForm formData={formData} setFormData={setFormData} />
      ) : (
        <SignUpForm formData={formData} setFormData={setFormData} />
      )}
      <button
        className="text-blue-500 hover:underline focus:outline-none mt-3"
        onClick={handleToggleForm}
      >
        {isLoginForm
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}
