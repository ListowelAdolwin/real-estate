import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaParking,
  FaChair,
  FaBath,
  FaBed,
  FaMapMarkerAlt,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import Contact from "../components/Contact";
import DeleteModal from "../components/DeleteModal";

function Listing() {
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState(false);
  const [copied, setCopied] = useState(false);

  const params = useParams();
  SwiperCore.use([Navigation]);
  const listingId = params.listingId;
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)

  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await fetch(`/api/listings/${listingId}`);
        const data = await res.json();
        if (res.ok) {
          setListing(data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error occured while retrieving listing: ", error);
      }
    };

    getListing();
  }, []);

  return (
    <main>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div>
            <Oval
              height="50"
              width="50"
              color="#383B53"
              ariaLabel="tail-spin-loading"
              radius="2"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      ) : (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[250px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountedPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountedPrice} Off
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&
              listing.author !== currentUser.data._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-slate-700 text-white rounded-lg hover:opacity-95 p-3"
                >
                  Contact landlord
                </button>
              )}
            {currentUser && listing.author === currentUser.data._id && (
              <div className="flex gap-4 mt-6">
                <Link
                  to={`/listing/edit/${listing._id}`}
                  className="bg-green-800 w-full max-w-[200px] p-1 rounded-md"
                >
                  <button className="bg-green-800 w-full max-w-[200px] text-white">
                    Edit
                  </button>
                </Link>
                <DeleteModal
                  modalTitle="Listing"
                  listingId={listing._id}
                  type="listing"
                />
              </div>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
