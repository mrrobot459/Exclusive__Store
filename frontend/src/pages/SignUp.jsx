import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/Api.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [Error, setError] = useState({
    success: false,
    message: "",
  });

  const [User, setUser] = useState({
    name: "",
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

      // 3 seconds ke baad message reset
      setTimeout(() => {
        setError({
          success: false,
          message: "",
        });
      }, 3000);

    } catch (error) {
      setError({
        success: false,
        message: error.response?.data?.message || "Registration failed",
      });
    }
  };




  return (
    <div className="p-20 flex">
      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=764&auto=format&fit=crop"
          alt=""
        />
      </div>

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

        {Error.message && (
          Error.success ? (
            <div>
              <p className="text-green-500">
                {Error.message }
              </p>
              <p>Redirect to Login page in 3 seconds</p>
              {setTimeout(() => {
                navigate("/login")
              }, 3000)}

            </div>
          ) : (
            <p className="text-red-500">
              {Error.message}
            </p>
          )
        )}





        <input
          type="email"
          onChange={handleForm}
          name="email"
          value={User.email}
          className="border-b-2 border-gray-400"
          placeholder="Email"
        />

        <input
          type="password"
          onChange={handleForm}
          name="password"
          value={User.password}
          className="border-b-2 border-gray-400"
          placeholder="Password"
        />

        <button
          type="submit"
          className="bg-red-500 py-3 text-white"
        >
          CREATE ACCOUNT
        </button>

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