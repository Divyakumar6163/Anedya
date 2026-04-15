import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function SetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async () => {
    if (!email || !password || !confirm) {
      return setError("All fields are required");
    }

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      const res = await API.post("/auth/set-password", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to set password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Set Your Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          First-time setup required
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* 📧 Email */}
        <div className="flex items-center border rounded-md mb-4 px-3">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            className="w-full p-2 outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 🔒 New Password */}
        <div className="flex items-center border rounded-md mb-4 px-3">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            className="w-full p-2 outline-none"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 🔒 Confirm Password */}
        <div className="flex items-center border rounded-md mb-5 px-3">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            className="w-full p-2 outline-none"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Save Password
        </button>
      </div>
    </div>
  );
}
