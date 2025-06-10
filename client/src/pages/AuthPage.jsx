import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = ({onAuth}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? "http://localhost:8000/api/auth/login"
        : "http://localhost:8000/api/auth/register";
      const res = await axios.post(endpoint, { email, password });
      localStorage.setItem("token", res.data.token);
      onAuth(); // <-- This updates the login state in App
      navigate("/dashboard");
    } catch (err) {
      alert("Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline text-sm"
          >
            {isLogin ? 'Create an account' : 'Have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
