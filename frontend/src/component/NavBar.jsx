import React, { useState } from "react";
import {
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { FaHeart, FaShoppingCart, FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const isSignupPage = location.pathname === "/signup";

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    };

    return (
        <>
            {/* Sale Banner */}
            <div className="w-full text-white">
                <nav className="w-full p-2 bg-black flex justify-center">
                    <h1 className="text-[10px] sm:text-xs md:text-sm lg:text-base text-center">
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF
                        50%!

                        <NavLink
                            to="/products"
                            className="underline ml-2"
                        >
                            Shop Now
                        </NavLink>
                    </h1>
                </nav>
            </div>

            {/* Navbar */}
            <div className="w-full flex items-center border-b border-gray-200 justify-between px-3 py-3 sm:px-5 md:px-7 lg:px-10 lg:py-5">

                {/* Logo */}
                <div>
                    <h1 className="text-xs sm:text-base md:text-lg lg:text-xl font-bold">
                        Exclusive
                    </h1>
                </div>

                {/* NavLinks */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-8 text-xs sm:text-sm md:text-base lg:text-base">

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "underline text-red-600" : ""
                        }
                        to="/"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "underline text-red-600" : ""
                        }
                        to="/contact"
                    >
                        Contact
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "underline text-red-600" : ""
                        }
                        to="/about"
                    >
                        About
                    </NavLink>

                    {/* Sign Up only when user is not logged in */}
                    {!token && (
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "underline text-red-600" : ""
                            }
                            to="/signup"
                        >
                            Sign Up
                        </NavLink>
                    )}
                </div>

                {/* Search + Icons */}
                {!isSignupPage && (
                    <div className="flex items-center text-xs gap-2 sm:gap-3 lg:gap-5">

                        {/* Search */}
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="What are you looking for?"
                                className="
                  border
                  px-2
                  py-1
                  sm:px-3
                  sm:py-1.5
                  lg:px-4
                  lg:py-2
                  pr-8
                  lg:pr-10
                  rounded
                  placeholder:text-[9px]
                  sm:placeholder:text-xs
                  lg:placeholder:text-sm
                  w-24
                  sm:w-32
                  md:w-40
                  lg:w-64
                "
                            />

                            <FaHeart
                                className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2"
                            />
                        </div>

                        {/* Wishlist */}
                        <NavLink
                            to="/wishlist"
                            className={({ isActive }) =>
                                isActive ? "text-red-600" : ""
                            }
                        >
                            <FaHeart size={20} />
                        </NavLink>

                        {/* Cart */}
                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                isActive ? "text-red-600" : ""
                            }
                        >
                            <FaShoppingCart size={20} />
                        </NavLink>

                        {/* Login / Logout */}
                        {token ? (
                            <button
                                onClick={logout}
                                className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full"
                            >
                                Logout
                            </button>
                        ) :
                            (
                                <NavLink
                                    to="/login"

                                    className={({ isActive }) =>
                                        isActive ? "text-green-600" : ""
                                    }
                                >
                                    <FaRegUserCircle size={20} />

                                </NavLink>

                            )}

                    </div>
                )}
            </div>
        </>
    );
};

export default NavBar;