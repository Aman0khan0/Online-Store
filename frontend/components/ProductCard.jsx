import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { getDiscountedPricePercentage } from "../utils/helper";
import { useSelector, useDispatch } from "react-redux";

import { FaCartPlus } from "react-icons/fa";
import { addToCart, checkoutCart } from "@/store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data: { attributes: p, id } }) => {
  const dispatch = useDispatch();

  const [loading , setLoading] = useState(false); 

  const handlebutton = () => {
    setLoading(true);


    console.log("Button Clicked");
    dispatch(checkoutCart());
    

  };

  return (

    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-90 cursor-pointer border-gray border-1 rounded-md shadow-md flex flex-col justify-between"
    >

{loading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )}
      <h2 className="font-medium ml-2 text-gray-900 text-2xl ">
        {p.name.split(" ").slice(0, 4).join(" ")}{" "}
      </h2>
      <button>
        <FaCartPlus className="p-2 text-4xl text-white bg-black rounded-full ml-auto" />
      </button>
      <Image
        width={500}
        height={500}
        src={p.thumbnail.data.attributes.url}
        alt={p.name}
      />

      <div className="flex items-center justify-between p-4 bg-white h-[30%] margin-top-auto">
        <div className="p-4 text-black/[0.9]">
          <div className="flex items-center text-black/[0.5] flex-col ">
            <p className="mr-2 text-lg font-semibold">${p.price}</p>

            {p.original_price && (
              <>
                <p className="text-base  font-medium line-through">
                  ${p.original_price}
                </p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {getDiscountedPricePercentage(p.original_price, p.price)}% off
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center  h-15 w-45  md:w-40  md:h-10 bg-gray-700 rounded-md object-contain hover:scale-105 transition-opacity">
          <button
            onClick={handlebutton}
            className="hover:text-3xl transition-all duration-200"
          >
            <h2 className="text-yellow-500 text-xl font-bold md:text-2xl">Buy Now</h2>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
