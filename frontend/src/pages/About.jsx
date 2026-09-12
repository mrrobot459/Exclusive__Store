import React from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";

const OurStory = () => {
  return (
    <section className="bg-white py-16 md:py-24 font-sans">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 flex flex-col md:flex-row items-center gap-12 lg:gap-24">

        {/* Left Column: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-8 tracking-wide">
            Our Story
          </h2>

          <p className="text-base text-black/80 leading-relaxed mb-6 font-normal">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported
            by wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3
            millions customers across the region.
          </p>

          <p className="text-base text-black/80 leading-relaxed font-normal">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="w-full md:w-1/2">
          {/* 
            Replace the src with your actual image path from Figma. 
            I've added a placeholder that roughly matches the dimensions. 
          */}
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Women shopping with bags"
            className="w-full h-auto object-cover rounded-md shadow-sm"
          />
        </div>

      </div>
      <div className="flex justify-evenly m-20" >
        <div className="w-1/3  text-center">

          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <TbTruckDelivery size={40} />
            </div>
          </div>

          <p className="mt-4 font-semibold text-gray-800">
            FREE AND FAST DELIVERY
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Free delivery for all orders over $140
          </p>

        </div>

        <div className="w-1/3  text-center">

          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <BiSupport size={40} />
            </div>
          </div>

          <p className="mt-4 font-semibold text-gray-800">
            24/7 CUSTOMER SERVICE
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Friendly 24/7 customer support
          </p>

        </div>
        <div className="w-1/3  text-center">

          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <MdOutlineSystemSecurityUpdateGood size={40} />
            </div>
          </div>

          <p className="mt-4 font-semibold text-gray-800">
            MONEY BACK GUARANTEE
          </p>

          <p className="mt-2 text-sm text-gray-500">
            We reurn money within 30 days            </p>

        </div>

      </div>
    </section>
  );
};

export default OurStory;