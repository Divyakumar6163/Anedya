import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", form);
      setSuccess("Account created successfully!");

      // Redirect after 1.5 sec
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Register to access IoT Dashboard
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Success */}
        {success && (
          <p className="text-green-500 text-sm mb-3 text-center">{success}</p>
        )}

        {/* Name */}
        <div className="flex items-center border rounded-md mb-4 px-3">
          <FaUser className="text-gray-400 mr-2" />
          <input
            className="w-full p-2 outline-none"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

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
          Register
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
