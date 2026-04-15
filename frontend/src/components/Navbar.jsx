import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-6 py-3 shadow-md">
      <h1 className="text-xl font-bold">Anedya</h1>

      <div className="flex gap-6 items-center">
        <Link className="hover:text-blue-400" to="/">
          Dashboard
        </Link>

        {user?.role === "admin" && (
          <Link className="hover:text-blue-400" to="/admin">
            Admin
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
