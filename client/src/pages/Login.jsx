import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../redux/features/user/userSlice";
import GoogleOauth from "../components/GoogleOauth";

function Login() {
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();
  const { isLoading, accessToken, currentUser } = useSelector((state) => state.user);

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
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log("Res: ", data)
    if (res.ok) {
      dispatch(registerSuccess({ user: data.user, accessToken: data.accessToken }));
      navigate("/");
      
    } else {
      dispatch(registerFailure(data.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-700">
      <div className="bg-gray-500 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl text-white font-bold text-center mb-4 dark:text-gray-200">
          Welcome Back!
        </h1>
        <form action="#">
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
              className="shadow-sm bg-gray-300  rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
          </div>
          <a
            href="#"
            className="text-xs text-white hover:outline-3 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500"
          >
            Forgot Password?
          </a>
          <div className="flex items-center justify-between mt-3 mb-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
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
              href="/register"
              className="text-xs text-gray-800 hover:text-gray-900 hover:outline-3 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500"
            >
              Create Account
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          )}
          <GoogleOauth />
        </form>
      </div>
    </div>
  );
}

export default Login;
