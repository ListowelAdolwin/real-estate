import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DeleteModal(props) {
  const [showModal, setShowModal] = useState(false);

  const { accessToken } = useSelector((state) => state.user);
  const API_URL = import.meta.env.VITE_API_URL

  const navigate = useNavigate();
  const handleDelete = async (type) => {
    if (type == "listing") {
      // handle listing delete
      try {
        const res = await fetch(`${API_URL}/api/listings/delete/${props.listingId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          navigate("/profile");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      // handle user account delete
    }
  };

  return (
    <div className="w-full max-w-[200px]">
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-800 w-full max-w-[200px] text-white px-4 py-1 rounded-md"
      >
        Delete {props.modalTitle}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Confirm {props.modalTitle} Delete
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
                    Are you sure you want to delete {props.modalTitle}?
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
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(false);
                      handleDelete(props.type);
                    }}
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
  );
}

export default DeleteModal;
