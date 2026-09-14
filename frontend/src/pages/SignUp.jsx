import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/Api.js";

const SignUp = () => {
  const [Error, setError] = useState({
    success: false,
    message: "",
  });

  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    setUser({
      ...User,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", User);

      setError({
        success: response.data.success,
        message: response.data.message,
      });

      // Registration successful hone par
      // 3 seconds ke baad Login page par redirect
      if (response.data.success) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }

    } catch (error) {
      setError({
        success: false,
        message:
          error.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className="p-20 flex">

      {/* Left Image */}
      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=764&auto=format&fit=crop"
          alt="Signup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="w-1/4 flex flex-col m-auto gap-8"
      >

        <h1 className="text-4xl font-bold">
          Create an account
        </h1>

        <p className="text-xl">
          Enter your details below
        </p>

        {/* Success / Error Message */}
        {Error.message && (
          Error.success ? (
            <div className="mb-4 rounded-xl border border-green-400 bg-green-50 px-4 py-3 shadow-lg shadow-green-200">

              <p className="text-center font-semibold text-green-700">
                {Error.message}
              </p>

              <p className="mt-1 text-center text-sm text-gray-600">
                Redirecting to Login page in{" "}
                <span className="font-bold text-green-600">
                  3 seconds...
                </span>
              </p>

            </div>
          ) : (
            <div className="mb-4 rounded-xl border border-red-400 bg-red-50 px-4 py-3 shadow-lg shadow-red-200">

              <p className="text-center font-semibold text-red-700">
                {Error.message}
              </p>

            </div>
          )
        )}

        

        {/* Email */}
        <input
          type="email"
          onChange={handleForm}
          name="email"
          value={User.email}
          className="border-b-2 border-gray-400 outline-none py-2"
          placeholder="Email"
          required
        />

        {/* Password */}
        <input
          type="password"
          onChange={handleForm}
          name="password"
          value={User.password}
          className="border-b-2 border-gray-400 outline-none py-2"
          placeholder="Password"
          required
        />

        {/* Create Account Button */}
        <button
          type="submit"
          className="bg-red-500 py-3 text-white rounded-md hover:bg-red-600 transition"
        >
          CREATE ACCOUNT
        </button>

        {/* Login Link */}
        <div className="flex justify-center gap-1">
          <p>Already have an account?</p>

          <Link
            to="/login"
            className="text-red-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>

      </form>
    </div>
  );
};

export default SignUp;