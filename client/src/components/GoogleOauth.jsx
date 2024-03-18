import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { registerSuccess } from "../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GoogleOauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(registerSuccess({ data }));
        console.log(data);
        navigate("/");
      } else {
        const data = await res.json();
        console.log("Error while logging in with google: ", res);
        console.log("Data: ", data);
      }
    } catch (error) {
      console.log("Error in google oauth: ", error);
    }
  };
  return (
    <button
      onClick={handleOAuth}
      type="button"
      className="w-full flex justify-center py-2 mt-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Continue with google
    </button>
  );
}

export default GoogleOauth;
