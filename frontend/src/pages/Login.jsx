import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/Api.js";

const Login = () => {
    const location = useLocation();
    const redirectMessage = location.state?.message || "";

    const [Error, setError] = useState({
        success: false,
        message: redirectMessage,
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
            const response = await api.post("/login", User);

            setError({
                success: response.data.success,
                message: response.data.message,
            });

            const token = response.data.token;

            localStorage.setItem("token", token);
            window.dispatchEvent(new Event("authStateChanged"));

            setTimeout(() => {
                navigate("/");
            }, 3000);

        } catch (error) {
            setError({
                success: false,
                message: error.response?.data?.message || "Login failed",
            });
        }
    };




    return (
        <div className="p-20 flex">


            <form
                onSubmit={handleSubmit}
                className="w-1/4 flex flex-col m-auto gap-8"
            >
                <h1 className="text-4xl font-bold">
                    Login to your Account
                </h1>

                <p className="text-xl">
                    Enter your details below
                </p>

                {Error.message && (
                    Error.success ? (
                        <div className="mb-4 rounded-xl border border-green-400 bg-green-50 px-4 py-3 shadow-lg shadow-green-200">
                            <p className="text-center font-semibold text-green-700">
                                {Error.message}
                            </p>

                            <p className="mt-1 text-center text-sm text-gray-600">
                                Redirect to Login page in{" "}
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
                    className="bg-red-500 py-3 text-white">
                    Login
                </button>

                <div className="flex justify-center gap-1">
                    <p>Dont have an account ?</p>

                    <Link
                        to="/signup"
                        className="text-red-500 font-semibold hover:underline"
                    >
                        signup
                    </Link>
                </div>
            </form>
            <div className="w-1/2">
                <img
                    src="https://images.unsplash.com/photo-1559056961-1f4dbbf9d36a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                />
            </div>
        </div>

    );
};

export default Login;