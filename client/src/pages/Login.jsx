import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setIsLoading(false);
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log("Res: ", res);
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      navigate("/");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setErrors(data.message);
    }
  };
  return (
    <div class="min-h-screen flex items-center justify-center w-full bg-gray-700">
      <div class="bg-gray-500 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 class="text-2xl text-white font-bold text-center mb-4 dark:text-gray-200">
          Welcome Back!
        </h1>
        <form action="#">
          <div class="mb-4">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-300 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter email"
              required
              onChange={handleChange}
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              class="shadow-sm bg-gray-300  rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
          </div>
          <a
            href="#"
            class="text-xs text-white hover:outline-3 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500"
          >
            Forgot Password?
          </a>
          <div class="flex items-center justify-between mt-3 mb-3">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remember"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                checked
              />
              <label
                for="remember"
                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="/register"
              class="text-xs text-gray-800 hover:text-gray-900 hover:outline-3 hover:ring-2 hover:ring-offset-2 hover:ring-gray-500"
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
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
