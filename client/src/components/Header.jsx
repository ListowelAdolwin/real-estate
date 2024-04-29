import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Wherever this component is imported, it should wrapped by the BrowerRouter
import { useSelector } from "react-redux";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const { currentUser, accessToken } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const newSearchTerm = urlParams.get("searchTerm");
    if (newSearchTerm) {
      setSearchTerm(newSearchTerm);
    }
  }, [window.location.search]);

  const handleNavlinkClick = () => {
    // if (window.innerWidth <= 768) {
    //   setIsOpen(false);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <nav className="">
      <div className="flex justify-around flex-wrap items-center bg-slate-800 md:p-0">
        <div className="text-xl">
          <Link to="/">
            <div className="sm:flex flex-wrap">
              <div className="text-white">Dream</div>
              <div className="text-sky-500">Home</div>
            </div>
          </Link>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex p-2 rounded bg-gray-300 items-center"
          >
            <input
              className="bg-transparent focus:outline-none w-40 sm:w-64"
              type="text"
              name="q"
              id=""
              placeholder="Search real estates"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button>
              <FaSearch className="text-slate-500"></FaSearch>
            </button>
          </form>
        </div>
        <div className="p-3 md:hidden">
          <svg
            className="h-6 transition-opacity duration-500 ease-in-out cursor-pointer hover:opacity-[0.5]"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            id="menu-button"
            onClick={toggleMenu}
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </div>
        <div id="menu" className={`md:block ${menuOpen ? "" : "hidden"}`}>
          <ul className="text-lg items-center w-screen md:w-auto md:flex ">
            <Link onClick={toggleMenu} to="/">
              <li className="p-4 text-gray-300 border-b border-gray-600 md:border-0 ">
                Home
              </li>
            </Link>
            <Link onClick={toggleMenu} to="/create-listing">
              <li className="p-4 text-gray-300 border-b border-gray-600 md:border-0">
                Create Listing
              </li>
            </Link>
            {!currentUser && (
              <Link onClick={toggleMenu} to="/login">
                <li className="p-4 text-gray-300 border-b border-gray-600 md:border-0 ">
                  Login
                </li>
              </Link>
            )}
            {!currentUser && (
              <Link onClick={toggleMenu} to="/register">
                <li className="p-4 text-gray-300 border-b border-gray-600 md:border-0 ">
                  Register
                </li>
              </Link>
            )}
            {currentUser && (
              <Link to="/profile">
                <li>
                  <img
                    className="h-8 w-8 mx-8 rounded-full object-cover"
                    src={currentUser.avatar}
                    alt="avatar"
                    onClick={toggleMenu}
                  />
                </li>
              </Link>
            )}{" "}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// import React from "react";
// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom"; // Wherever this component is imported, it should wrapped by the BrowerRouter
// import { useSelector } from "react-redux";

// function Header() {
//   //const [isOpen, setIsOpen] = useState(false);
//   const isOpen = false
//   const [searchTerm, setSearchTerm] = useState('')

//   const { currentUser, accessToken } = useSelector((state) => state.user);
//   console.log("currentUser: ", currentUser);
//   console.log("accessToken: ", accessToken);
//   const navigate = useNavigate()

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search)
//     const newSearchTerm = urlParams.get("searchTerm");
//     if (newSearchTerm) {
//       setSearchTerm(newSearchTerm);
//     }
//   }, [window.location.search])

//   const handleNavlinkClick = () => {
//     // if (window.innerWidth <= 768) {
//     //   setIsOpen(false);
//     // }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const urlParams = new URLSearchParams(window.location.search)
//     urlParams.set('searchTerm', searchTerm)
//     const searchQuery = urlParams.toString()
//     navigate(`/search?${searchQuery}`)
//   }

//   return (
//     <div>
//       <header
//         className={`${isOpen ? "block p-4 bg-gray-500 text-2xl space-y-4" : "flex justify-around gap-3 items-center p-4 bg-gray-500"}`}
//       >
//         <div className="text-xl">
//           <Link to="/">
//             <div className="flex flex-wrap">
//               <span className="text-white">Dream</span>
//               <span className="text-sky-500">Home</span>
//             </div>
//           </Link>
//         </div>
//         <div className={`${isOpen ? "hidden" : "block"}`}>
//           <form
//             onSubmit={handleSubmit}
//             className="flex p-2 rounded bg-gray-300 items-center"
//           >
//             <input
//               className="bg-transparent focus:outline-none w-40 sm:w-64"
//               type="text"
//               name="q"
//               id=""
//               placeholder="Search real estates"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//               }}
//             />
//             <button>
//               <FaSearch className="text-slate-500"></FaSearch>
//             </button>
//           </form>
//         </div>
//         <div>
//           <ul
//             className={`flex flex-grow flex-col items-center text-white ${isOpen ? "block" : "hiden"} space-y-4 sm:flex sm:flex-row sm:space-x-4 sm:space-y-0`}
//           >
//             <Link
//               className="md:mr-12 hidden md:inline bg-green-600 p-2 rounded-md"
//               to="/create-listing"
//             >
//               Create Listing
//             </Link>
//             <Link
//               className="md:mr-12 md:hidden  bg-green-600 p-2 rounded-md"
//               to="/create-listing"
//             >
//               Create
//             </Link>
//             {currentUser ? (
//               <Link to="/profile">
//                 <img
//                   className="h-12 w-12 md:ml-12 rounded-full object-cover"
//                   src={currentUser.avatar}
//                   alt="avatar"
//                 />
//               </Link>
//             ) : (
//               <div className="flex space-x-4">
//                 <Link onClick={handleNavlinkClick} to="/login">
//                   <li>Login</li>
//                 </Link>
//                 <Link onClick={handleNavlinkClick} to="/register">
//                   <li>Register</li>
//                 </Link>
//               </div>
//             )}
//           </ul>
//         </div>

//         {/* <div className="block sm:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
//           >
//             <svg
//               className={`fill-current h-4 w-4 ${isOpen ? "hidden" : "block"}`}
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//             </svg>
//             <svg
//               className={`fill-red-900 font-bold h-4 w-4 ${isOpen ? "block" : "hidden"}`}
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
//             </svg>
//           </button>
//         </div> */}
//       </header>
//     </div>
//   );
// }

// export default Header;
