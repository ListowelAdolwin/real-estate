import React from "react";
import { FaBath, FaBed, FaExternalLinkAlt } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

function Listing({ listing }) {
  return (
    <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm">
      <button className="hover:text-orange-600 absolute z-30 top-2 right-0 mt-2 mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
      <Link
        to={`/listing/${listing._id}`}
        className="z-20 absolute h-full w-full top-0 left-0 "
      >
        &nbsp;
      </Link>
      <div className="h-auto overflow-hidden">
        <div className="h-44 overflow-hidden relative">
          <img src={listing.imageUrls[0]} alt="listing image" />
        </div>
      </div>
      <div className="bg-white py-4 px-3">
        <p className="text-xs text-gray-400 line-clamp-2">
          {listing.description}
        </p>
        <p className="truncate">{listing.name}</p>
        <div className="relative z-40 flex justify-between items-center mt-2">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">{listing.bathrooms}</span>
            <FaBath className="text-orange-600" />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">{listing.bedrooms}</span>
            <FaBed className="text-orange-600" />
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-sm text-gray-500">
              ${listing.regularPrice.toLocaleString("en-US")}
            </span>
            <BsCurrencyDollar className="text-orange-600" />
          </div>
          <Link
            to={`/listing/${listing._id}`}
            className="text-orange-600 hover:text-blue-500"
          >
            <FaExternalLinkAlt />
          </Link>
        </div>
      </div>
      <div className="text-xs p-3 flex justify-between items-center">
        {listing.type === "rent" ? (
          <div className="bg-gray-300 p-1 rounded-lg">rent</div>
        ) : (
          <div className="bg-gray-300 p-1 rounded-lg">sale</div>
        )}
        {listing.furnished && (
          <div className="bg-gray-300 p-1 rounded-lg">furnished</div>
        )}
        {listing.parking && (
          <div className="bg-gray-300 p-1 rounded-lg">parking</div>
        )}
        {listing.parking && <p className="bg-gray-300 p-1 rounded-lg">offer</p>}
      </div>
    </div>
  );
}

export default Listing;
