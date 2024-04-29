import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import {
  updateUser,
  logoutUser,
  deleteUser,
} from "../redux/features/user/userSlice.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Listing from "../components/Listing.jsx";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, accessToken } = useSelector((state) => state.user);
  console.log("currentUser: ", currentUser);
  const [avatar, setAvatar] = useState(undefined);
  const [userData, setUserData] = useState({
    username: currentUser.username,
    email: currentUser.email,
  });
  const [avatarUploadError, setAvatarUploadError] = useState(false);
  const [avatarUploadPercent, setAvatarUploadPercent] = useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [userListings, setUserListings] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getUserListings();
  }, []);

  useEffect(() => {
    if (avatar) {
      handleFileUpload(avatar);
    }
  }, [avatar]);

  const avatarRef = useRef(null);

  const handleFileUpload = (avatar) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "__" + avatar.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, avatar);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setAvatarUploadPercent(Math.round(progress));
      },
      (error) => {
        console.log("Error in firebase: ", error);
        setAvatarUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadRUL) => {
          setUserData({ ...userData, avatar: downloadRUL });
        });
      }
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    console.log(currentUser);
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/user/update/${currentUser._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log("Updated: ", data)
    if (res.ok) {
      dispatch(updateUser({ ...data }));
      toast("Profile successfully updated!");
    } else {
      console.log("Error occured in updating profile");
      console.log("Data: ", data);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setShowModal(false);
    const res = await fetch(`${API_URL}/api/user/delete/${currentUser._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      navigate("/");
      dispatch(deleteUser());
      console.log(data);
    } else {
      console.log("Error while deleting user");
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch("${API_URL}/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(logoutUser());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getUserListings = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/listings/user/${currentUser._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch user listings");
      }
      const data = await res.json();
      setUserListings(data);
    } catch (error) {
      console.error("Error fetching user listings:", error);
    }
  };

  return (
    <div className="md:flex  md:gap-5 px-5 py-2 bg-gray-100">
      <ToastContainer />
      <div className="bg-gray-100 md:w-3/12 md:h-screen md:overflow-y-autho shadow-xl rounded-lg text-gray-900">
        <div className="hidden">
          <input
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            ref={avatarRef}
          />
        </div>
        <div className="mx-auto w-32 h-32 relative border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32 cursor-pointer"
            src={userData.avatar || currentUser.avatar}
            alt="Profile picture"
            onClick={() => avatarRef.current.click()}
          />
        </div>
        <p className="text-sm text-center">
          {avatarUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 10 mb)
            </span>
          ) : avatarUploadPercent > 0 && avatarUploadPercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${avatarUploadPercent}%`}</span>
          ) : avatarUploadPercent === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <div className="text-center mt-2">
          <h2 className="font-semibold">Profile</h2>
        </div>
        <form>
          <div className="p-3">
            <div className="mb-4">
              <input
                type="text"
                id="username"
                name="username"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={currentUser.username}
                placeholder="Enter new username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={currentUser.email}
                placeholder="Enter new email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter new password"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            type="submit"
            className="mx-auto w-full mb-5 rounded-full bg-gray-800 hover:shadow-lg font-semibold text-white px-6 py-2"
          >
            Update
          </button>
          <Link
            type="submit"
            className="mx-auto w-full text-center mb-5 rounded-full bg-green-600 hover:shadow-lg font-semibold text-white px-6 py-2"
            to="/create-listing"
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mb-3 text-sm">
          <button
            onClick={handleLogout}
            className="mb-5 rounded-full bg-gray-700 hover:shadow-lg font-semibold text-white px-4 py-1"
          >
            Logout
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="mb-5 font-semibold text-red-500 px-6 py-2"
          >
            Delete Account
          </button>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Confirm Account Deletion
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Are you sure you want to delete account?
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                        type="button"
                        onClick={handleDelete}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
      <div className="md:flex-grow md:w-6/12 md:h-screen md:overflow-y-auto">
        <h2 className="text-2xl text-center mb-4 font-bold text-gray-600">
          Listings created by {currentUser.username}
        </h2>
        <div className="relative flex mn-h-screen flex-col justify-center overflow-hidden sm:py-4">
          <div className="mx-auto max-w-screen-xl px-4 w-full">
            <div className="grid w-full sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {userListings.map((listing, index) => (
                <Listing key={index} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
