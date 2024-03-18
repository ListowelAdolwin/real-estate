import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Wherever this component is imported, it should wrapped by the BrowerRouter
import { useSelector } from "react-redux";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleNavlinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <header
        className={`${isOpen ? "block p-4 bg-gray-500 text-2xl space-y-4" : "flex justify-around gap-3 items-center p-4 bg-gray-500"}`}
      >
        <div className="text-xl">
          <Link to="/">
            <div className="flex flex-wrap">
              <span className="text-white">Real</span>
              <span className="text-sky-500">Estate</span>
            </div>
          </Link>
        </div>
        <div className={`${isOpen ? "hidden" : "block"}`}>
          <form action="" className="flex p-2 rounded bg-gray-300 items-center">
            <input
              className="bg-transparent focus:outline-none w-40 sm:w-64"
              type="text"
              name="q"
              id=""
              placeholder="Search real estates"
            />
            <FaSearch className="text-slate-500"></FaSearch>
          </form>
        </div>
        <div>
          <ul
            className={`flex flex-grow flex-col items-center text-white ${isOpen ? "block" : "hidden"} space-y-4 sm:flex sm:flex-row sm:space-x-4 sm:space-y-0`}
          >
            <Link onClick={handleNavlinkClick} className="active" to="/">
              <li>Home</li>
            </Link>
            <Link onClick={handleNavlinkClick} to="/about">
              <li>About</li>
            </Link>
            {currentUser ? (
              <Link to="/profile">
                <img
                  className="h-8 l-8 md:ml-12 rounded-full object-cover"
                  src={currentUser.data.avatar}
                  alt="avatar"
                />
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link onClick={handleNavlinkClick} to="/login">
                  <li>Login</li>
                </Link>
                <Link onClick={handleNavlinkClick} to="/register">
                  <li>Register</li>
                </Link>
              </div>
            )}
          </ul>
        </div>

        <div className="block sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
          >
            <svg
              className={`fill-current h-4 w-4 ${isOpen ? "hidden" : "block"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className={`fill-red-900 font-bold h-4 w-4 ${isOpen ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
