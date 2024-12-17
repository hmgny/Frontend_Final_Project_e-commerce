import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, toggleRememberMe } from "../store/actions/authActions";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, rememberMe } = useSelector((state) => state.auth);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "https://workintech-fe-ecommerce.onrender.com/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      if (res.status === 200 && res.data.token) {
        reset();
        toast.success(`Merhaba ${res.data.name}, tekrar hoş geldin.`);

        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
        }

        dispatch(loginSuccess({ 
          user: res.data,
          token: res.data.token 
        }));
        history.push("/");
      }
    } catch (error) {
      console.error(
        "An error occurred during login:",
        error.response?.data || error.message
      );
      dispatch(loginFailure(error.response?.data || error.message));
      toast.error("Girdiğiniz bilgilerle bir kullanıcı bulamadık.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Remember Me checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => dispatch(toggleRememberMe())}
              className="mr-2"
            />
            <span className="text-sm">Remember me</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 w-full disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
