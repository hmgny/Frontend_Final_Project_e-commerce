import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Gravatar from "react-gravatar";
import { toast } from "react-toastify";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });

      setUser(response.data);
      setError(null);

      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
      }
      toast.success("Logged in successfully!");
      history.push(history.goback() || "/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed! Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <span
            id="password-error"
            className="text-red-500 text-xs hidden"
          ></span>
        </div>
        <div className="flex items-center mb-4">
          <input
            className="mr-2 leading-tight"
            id="remember-me"
            type="checkbox"
          />
          <label className="text-gray-700 text-sm" htmlFor="remember-me">
            Remember me
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-500 text-xs mt-4">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 hover:text-blue-700 font-bold"
        >
          Signup
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
