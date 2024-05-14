import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Listing from "../components/Listing";
import backgroundImageMobile from "../assets/bg10.jpg";
import backgroundImage from "../assets/bg7.avif";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/listings?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/listings?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/listings?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div
        className="w-full h-screen mx-auto hidden md:block"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          opacity: "100%",
        }}
      >
        {/* top */}
        <div className="p-5 sm:p-16 max-w-2xl">
          <div className="bg-slate-700  bg-opacity-60 p-5 flex flex-col gap-5">
            <h1 className="text-white font-bold text-3xl lg:text-6xl">
              Find your next <span className="">perfect</span>
              <br />
              place with ease
            </h1>
            <div className="text-sky-300 text-sm">
              Dream Home Finder is the best place to find your next perfect
              place to live. We have a wide range of properties for you to
              choose from.
            </div>
            <Link
              to="/search"
              className="w-60 bg-cyan-950 text-cyan-400 border border-cyan-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            >
              <span className="bg-cyan-400 shadow-cyan-400 absolute -top-[150%] left-0 rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Let's Get Started
            </Link>
          </div>
        </div>
      </div>
      <div
        className="w-full mx-auto md:hidden"
        style={{
          backgroundImage: `url(${backgroundImageMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          opacity: "100%",
        }}
      >
        {/* top */}
        <div className="p-5 sm:p-12 max-w-2xl">
          <div className="bg-slate-700  bg-opacity-60 p-5 flex flex-col gap-5">
            <h1 className="text-white font-bold text-3xl lg:text-6xl">
              Find your next <span className="">perfect</span>
              <br />
              place with ease
            </h1>
            <div className="text-sky-300 text-sm">
              Dream Home Finder is the best place to find your next perfect
              place to live. We have a wide range of properties for you to
              choose from.
            </div>
            <Link
              to="/search"
              className="w-60 bg-cyan-950 text-cyan-400 border border-cyan-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            >
              <span className="bg-cyan-400 shadow-cyan-400 absolute -top-[150%] left-0 rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Lets' Get Started
            </Link>
          </div>
        </div>
      </div>
      {/* swiper */}
      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}
      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <Listing listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <Listing listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <Listing listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
