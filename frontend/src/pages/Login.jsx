import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/login", form);
      console.log("Login response:", res.data);
      if (res.data.isFirstLogin) {
        console.log("First login detected, redirecting to set password");
        navigate("/set-password", {
          state: { userId: res.data.userId, email: form.email },
        });
        return;
      }
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">Login</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Access your IoT Dashboard
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Email */}
        <div className="flex items-center border rounded-md mb-4 px-3">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            className="w-full p-2 outline-none"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-md mb-5 px-3">
          <FaLock className="text-gray-400 mr-2" />
          <input
            className="w-full p-2 outline-none"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
