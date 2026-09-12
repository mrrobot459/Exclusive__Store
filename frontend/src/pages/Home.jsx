import React, { useEffect, useState } from 'react'

import { IoMdArrowDropright, IoIosPhonePortrait } from "react-icons/io";
import { FaLaptop, FaCamera, FaGamepad } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";
import { CiHeadphones } from "react-icons/ci";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";




import api from "../api/Api.js"
import Cards from "../component/Cards.jsx"

const Home = () => {

  const icons = [
    {
      name: "Phone",
      icon: <IoIosPhonePortrait />
    },
    {
      name: "laptop",
      icon: <FaLaptop />
    },
    {
      name: "Camera",
      icon: <FaCamera />
    },
    {
      name: "Gaming",
      icon: <FaGamepad />
    },
    {
      name: "Watch",
      icon: <BsSmartwatch />
    },
    {
      name: "Headphone",
      icon: <CiHeadphones />
    },
  ]


  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const [productsResponse, latestResponse] = await Promise.all([
          api.get("/product"),
          api.get("/product/latest")
        ]);

        setProducts(productsResponse.data.products);
        setLatestProducts(latestResponse.data.products);


      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <div className="flex h-[50vh]">

        {/* Left Sidebar */}
        <div className="flex justify-center pr-10 w-[50%] lg:w-[40%] border-r-2 border-gray-400 ">

          <div className="w-[50%]   flex flex-col gap-5 text-xs sm:text-sm md:text-base whitespace-nowrap sm:gap-3">

            <p className="flex items-center justify-between">
              Woman’s Fashion
              <IoMdArrowDropright className="text-xl hidden sm:block " />
            </p>

            <p className="flex items-center justify-between">
              Men’s Fashion
              <IoMdArrowDropright className="text-xl hidden sm:block " />
            </p>

            <p>Electronics</p>

            <p>Home & Lifestyle</p>

            <p>Medicine</p>

            <p>Sports & Outdoor</p>

            <p>Baby’s & Toys</p>

            <p>Groceries & Pets</p>

            <p>Health & Beauty</p>

          </div>

        </div>

        {/* Right Content */}
        <div className="w-[50%] lg:w-[60%] h-full overflow-hidden">
          <img
            className="p-5 w-full h-full "
            src={products[0]?.image}
            alt=""
          />
        </div>

      </div>

      {/* Flash Sales */}

      <div className="w-[80%]  m-auto mt-30">
        <div className="flex" >
          <p className="flex text-red-500 font-bold sm:text-2xl items-center gap-3"><span className="block bg-red-600 px-2  py-4 w-5 rounded-lg  "></span> Today’s</p>
        </div>

        <div className='flex justify-between'  >
          <div>
            <h1 className=" font-bold mt-5 text-xm lg:text-4xl">Flash Sales</h1>
          </div>
          <div className="flex" >
            <div className="flex gap-5" >
              <div >
                <p className="font-bold" >Days</p>
                <p className=" text-xl lg:text-4xl font-bold" >03</p>
              </div>
              <span className="text-xl lg:text-3xl font-bold text-red-600 mt-7">:</span>

              <div>
                <p className="font-bold" >hours</p>
                <p className=" text-xl lg:text-4xl font-bold" >19</p>
              </div>
              <span className="text-xl lg:text-3xl font-bold text-red-600 mt-7">:</span>

              <div>
                <p className="font-bold" >minuts</p>
                <p className=" text-xl lg:text-4xl font-bold" >58</p>
              </div>
              <span className="text-xl lg:text-3xl font-bold text-red-600 mt-7">:</span>

              <div>
                <p className="font-bold" >seconds</p>
                <p className=" text-xl lg:text-4xl font-bold" >8</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <p className="bg-gray-200 hidden  hover:bg-gray-300 hover:text-red-500  rounded-full w-10 h-10 lg:flex items-center justify-center">
              <FaArrowRight />
            </p>

            <p className="bg-gray-200 hidden  hover:bg-gray-300 hover:text-red-500 rounded-full w-10 h-10 lg:flex items-center justify-center">
              <FaArrowLeft />
            </p>
          </div>
        </div>

        {/* swiper  */}
        <Cards products={products} />
        <div className="flex justify-center ">
          <button className="bg-red-600 py-3 text-white px-10 rounded-xl mt-10" >View All Products</button>
        </div>


        {/* Categories */}

        <div className="flex" >
          <p className="flex text-red-500 font-bold sm:text-2xl items-center gap-3"><span className="block bg-red-600 px-2  py-4 w-5 rounded-lg  "></span> Categories</p>
        </div>
        <div>
          <h1 className=" font-bold mt-5 text-xm lg:text-3xl ">Browse By Categories</h1>
        </div>

        <div className="flex justify-evenly gap-5 flex-col lg:flex-row  mt-10">
          {icons.map((product, idx) => {
            return (
              <div
                key={product.name}

                className={`border-2 rounded-xl  px-10 py-5 flex flex-col items-center
                    ${idx === 3
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-gray-400 hover:bg-red-500 hover:border-red-500 hover:text-white"}`}>
                <p className="text-8xl">{product.icon}</p>
                <p>{product.name}</p>
              </div>
            );
          })}
        </div>
        {/* this Month  */}
        <div className="flex mt-20" >
          <p className="flex text-red-500 font-bold sm:text-2xl items-center gap-3">
            <span className="block bg-red-600 px-2  py-4 w-5 rounded-lg  "></span>This Month</p>
        </div>
        <div>
          <h1 className=" font-bold mt-5 text-xm mt=5 mb-5 lg:text-3xl ">Browse By Products</h1>
        </div>

        <div className="flex w-full">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => {
              return (
                <div
                  key={product._id}
                  className="group bg-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full h-52 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                    <img
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="mt-4">
                    <p className="text-base font-medium text-gray-800 line-clamp-1">
                      {product.name}
                    </p>

                    <p className="mt-2 text-lg font-semibold text-red-500">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>


                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex mt-20" >
          <p className="flex text-red-500 font-bold sm:text-2xl items-center gap-3">
            <span className="block bg-red-600 px-2  py-4 w-5 rounded-lg  "></span>Featured</p>
        </div>
        <div>
          <h1 className=" font-bold mt-5 text-xm mt=5 mb-5 lg:text-3xl ">New Arrival</h1>
        </div>


        <div className="flex w-full gap-4 h-[70vh]">

          {/* Left */}
          <div className="w-1/2 h-full">
            <img
              className="w-full rounded-md h-full object-cover"
              src={latestProducts?.[9]?.image}
              alt=""
            />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5 w-1/2 h-full">

            {/* Top */}
            <div className="h-1/2">
              <img
                className="w-full rounded-md h-full object-cover"
                src={latestProducts?.[12]?.image}
                alt=""
              />
            </div>

            {/* Bottom */}
            <div className="flex h-1/2 gap-5">
              <div className="w-1/2 h-full">
                <img
                  className="w-full rounded-md h-full object-cover"
                  src={latestProducts?.[16]?.image}
                  alt=""
                />
              </div>

              <div className="w-1/2 h-full">
                <img
                  className="w-full rounded-md h-full object-cover"
                  src={latestProducts?.[0]?.image}
                  alt=""
                />
              </div>
            </div>

          </div>

        </div>


        <div>


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

      </div>


    </>
  )
}

export default Home