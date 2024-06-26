import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/features/user/userSlice";
import GoogleOauth from "../components/GoogleOauth";

function Register() {
  const [userData, setUserData] = useState({});

  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    dispatch(registerFailure());
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(registerSuccess({ data }));
      navigate("/login");
    } else {
      dispatch(registerFailure({ data }));
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center w-full bg-gray-700">
        <div className="bg-gray-500 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Register
          </h1>
          <form className="" action="#">
            <div className="mb-4">
              <label
                for="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="shadow-sm bg-gray-300 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                for="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-300 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                for="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow-sm bg-gray-300  rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-500 focus:outline-none"
                  defaultChecked
                />
                <label
                  for="remember"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/login"
                className="text-xs text-gray-800 hover:text-gray-900 hover:outline-3 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500"
              >
                Login
              </a>
            </div>
            {isLoading ? (
              <div
                style={{
                  margin: "auto",
                }}
              >
                <Oval
                  height="30"
                  width="30"
                  color="#383B53"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Register
              </button>
            )}
            <GoogleOauth />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
