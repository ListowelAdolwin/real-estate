import React from "react";
import { FaBath, FaBed, FaExternalLinkAlt } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

function Listing(props) {
    const data = {
        _id: "ighdudidjodirr"
    }
  return (
    <div class="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm">
      <a
        href=""
        class="hover:text-orange-600 absolute z-30 top-2 right-0 mt-2 mr-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </a>
      <a href="" class="z-20 absolute h-full w-full top-0 left-0 ">
        &nbsp;
      </a>
      <div class="h-auto overflow-hidden">
        <div class="h-44 overflow-hidden relative">
          <img src={props.imageUrls[0]} alt="listing image" />
        </div>
      </div>
      <div class="bg-white py-4 px-3">
        <p class="text-xs text-gray-400">{props.description}</p>
        <p>{props.title}</p>
        <div class="relative z-40 flex justify-between items-center mt-2">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">{props.baths}</span>
            <FaBath class="text-orange-600" />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">{props.beds}</span>
            <FaBed class="text-orange-600" />
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-sm text-gray-500">${props.price}</span>
            <BsCurrencyDollar class="text-orange-600" />
          </div>
          <Link
            to={`/listing/${props.id}`}
            class="text-orange-600 hover:text-blue-500"
          >
            <FaExternalLinkAlt />
          </Link>
        </div>
      </div>
      <div class="text-xs p-3 flex justify-between items-center">
        {props.type === "rent" ? (
          <div className="bg-gray-300 p-1 rounded-lg">rent</div>
        ) : (
          <div className="bg-gray-300 p-1 rounded-lg">sale</div>
        )}
        {props.furnished && (
          <div className="bg-gray-300 p-1 rounded-lg">furnished</div>
        )}
        {props.parking && (
          <div className="bg-gray-300 p-1 rounded-lg">parking</div>
        )}
        {props.parking && <p class="bg-gray-300 p-1 rounded-lg">offer</p>}
      </div>
    </div>
  );
}

export default Listing;
