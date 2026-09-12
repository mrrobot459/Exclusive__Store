import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const Cards = ({ products }) => {
    return (

        <div className=" mt-10 ">
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                navigation
                modules={[Navigation]}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div className="border rounded-lg p-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-20 lg:h-48 object-cover"
                            />

                            <h2 className="font-bold mt-3">
                                {product.name}
                            </h2>

                            <p className="text-red-500 font-bold">
                                ₹{product.price}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Cards