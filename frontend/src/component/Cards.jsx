import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaHeart } from "react-icons/fa";
import api from "../api/Api.js";

const Cards = ({ products }) => {
    const navigate = useNavigate();
    const [wishlistIds, setWishlistIds] = useState([]);
    const token = localStorage.getItem("token");

    const fetchWishlist = async () => {
        if (!token) {
            setWishlistIds([]);
            return;
        }

        try {
            const response = await api.get("/wishlist", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const ids = (response.data.wishlist || []).map((item) => item._id || item);
            setWishlistIds(ids);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [token]);

    const toggleWishlist = async (productId, event) => {
        if (event) {
            event.stopPropagation();
        }

        if (!token) {
            window.alert("Please login to add products to wishlist");
            navigate("/login");
            return;
        }

        const isSaved = wishlistIds.includes(productId);

        try {
            if (isSaved) {
                await api.delete(`/wishlist/remove/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await api.post(`/wishlist/add/${productId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            setWishlistIds((prev) =>
                isSaved
                    ? prev.filter((id) => id !== productId)
                    : [...prev, productId]
            );
        } catch (error) {
            console.error(error);
            window.alert(error.response?.data?.message || "Unable to update wishlist");
        }
    };

    return (
        <div className="mt-10">
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                navigation
                modules={[Navigation]}
            >
                {products.map((product) => {
                    const isSaved = wishlistIds.includes(product._id);

                    return (
                        <SwiperSlide key={product._id}>
                            <div
                                className="relative cursor-pointer overflow-hidden rounded-lg border p-4"
                                onClick={() => navigate(`/product/${product._id}`)}
                            >
                                <button
                                    type="button"
                                    onClick={(event) => toggleWishlist(product._id, event)}
                                    className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md transition hover:scale-105"
                                    aria-label="Add to wishlist"
                                >
                                    <FaHeart
                                        className={isSaved ? "text-red-500" : "text-gray-400"}
                                        size={18}
                                    />
                                </button>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-20 w-full object-cover lg:h-48"
                                />

                                <h2 className="mt-3 font-bold">{product.name}</h2>

                                <p className="text-red-500 font-bold">₹{product.price}</p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Cards;