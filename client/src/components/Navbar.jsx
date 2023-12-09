/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function Navbar() {
  const { isAuthed, setIsAuthed, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUser({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
    });
    setIsAuthed(false);
    navigate(0);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-xl font-semibold">
          Home
        </NavLink>
        <div className="flex space-x-4">
          <NavLink to="/create" className="text-white">
            Create Book
          </NavLink>
          {localStorage.getItem("token") ? (
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          ) : (
            <NavLink to="/auth" className="text-white">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
