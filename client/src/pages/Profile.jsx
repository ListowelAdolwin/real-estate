import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
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

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(undefined);
  const [userData, setUserData] = useState({
    username: currentUser.data.username,
    email: currentUser.data.email,
  });
  const [avatarUploadError, setAvatarUploadError] = useState(false);
  const [avatarUploadPercent, setAvatarUploadPercent] = useState(0);
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    if (avatar) {
      handleFileUpload(avatar);
    }
  }, [avatar]);

  const avatarRef = useRef(null);
  const handleFileUpload = (avatar) => {
    const storage = getStorage(app);
    const fileName = avatar.name + new Date().getTime();
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
    e.preventDefault();
    const res = await fetch(`/api/user/update/${currentUser.data._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateUser({ data }));
    } else {
      console.log("Error occured in updating profile");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setShowModal(false)
    const res = await fetch(`/api/user/delete/${currentUser.data._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      navigate("/")
      dispatch(deleteUser());
      console.log(data);
    } else {
      console.log("Error while deleting user");
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="md:flex  md:gap-5 px-5 py-2">
      <div className="md:w-4/12 md:h-screen md:overflow-y-auto bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
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
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32 cursor-pointer"
            src={userData.avatar || currentUser.data.avatar}
            alt="Woman looking front"
            onClick={() => avatarRef.current.click()}
          />
        </div>
        <p className="text-sm text-center">
          {avatarUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
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
                defaultValue={currentUser.data.username}
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
                defaultValue={currentUser.data.email}
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
                      <h3 className="text-3xl font-semibold">Confirm Account Deletion</h3>
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
      <div className="md:flex-grow md:w-7/12 md:h-screen md:overflow-y-auto">
        <h1 className="text-2xl">House Listings</h1>
        Listings Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Molestiae doloribus nihil et suscipit repudiandae vero quas, labore
        sequi in, fugiat facere hic? Temporibus impedit minus aut numquam
        excepturi reprehenderit, assumenda accusantium esse dicta, ipsam animi
        sed voluptate aspernatur illum repellat, quasi tenetur nostrum suscipit
        ex! Impedit, aliquam! Eligendi temporibus odit consequuntur quaerat
        architecto mollitia velit eum. Officia eaque eligendi animi nihil quo ea
        repudiandae hic ipsa, dolore quasi. Laborum sequi consectetur enim
        doloremque, voluptatum praesentium nulla. Accusantium iure adipisci
        impedit vel officiis dolores quaerat qui accusamus! Minus, quisquam
        perspiciatis soluta voluptate, esse iusto impedit ipsam sapiente, et
        inventore autem adipisci?
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro nobis
          debitis fugit iusto repudiandae, veritatis sapiente modi. Expedita
          pariatur perferendis aut quod. Eos quos, dolore sed minima,
          necessitatibus, quibusdam recusandae dicta voluptas accusamus
          excepturi beatae aspernatur. Tempora, magni voluptatum provident
          exercitationem eius ad nulla nam modi repellat. Cumque eligendi vitae
          maxime nulla! Culpa assumenda, magni aliquid dolores voluptatem rerum
          eius nulla a ratione recusandae nisi ea voluptas! Molestias eveniet
          sapiente, voluptates, cumque corporis ea quam alias nam soluta harum
          amet illum doloribus? Eum iste blanditiis eos, impedit ad
          consequuntur. Accusantium maiores et vitae. Quos iure possimus enim in
          neque optio?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
          iusto distinctio cumque praesentium beatae assumenda quibusdam,
          quaerat sint eligendi soluta aut, dolore minus, culpa dicta! Aut
          maiores quos repellat sunt placeat perspiciatis velit qui totam at
          deserunt! Praesentium atque ad quam quia odit. Iusto accusamus,
          aperiam sapiente in dolore labore reprehenderit, sit rerum, adipisci
          aspernatur quia officiis. Consectetur at qui ducimus obcaecati quasi,
          fuga suscipit architecto mollitia itaque eaque, labore recusandae
          beatae quidem magnam porro aperiam nobis! Nostrum inventore quaerat
          illum maiores aliquid vero, ratione minus quasi a iure! Numquam in
          labore, quod doloremque eligendi expedita temporibus blanditiis
          molestias eos.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta modi
          vitae rerum, nostrum at obcaecati, explicabo id minima quam totam
          numquam ducimus placeat illum ratione animi sed eaque tenetur
          cupiditate officia blanditiis pariatur laborum corporis? Unde facere
          officiis officia et nam ab vero provident ipsa itaque consequuntur id
          magnam libero impedit cum sit soluta possimus assumenda molestias,
          consequatur, laudantium facilis? Accusantium corrupti voluptas quod
          voluptatum, quasi, impedit magnam dicta debitis iusto harum officia
          non necessitatibus voluptates maxime fugiat? Aliquid officiis quod
          exercitationem, iure optio eum earum blanditiis commodi quo placeat
          praesentium iste assumenda dolore, vero, distinctio tempora ea
          quibusdam rerum!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          accusantium doloremque hic aperiam nulla esse inventore! Numquam, eum
          quaerat quis at cum neque unde molestiae dolor. Aliquam, similique
          nemo autem aut ipsam maxime non laboriosam consequuntur rem atque
          assumenda accusantium vel fugiat ratione voluptatum, ducimus cumque
          velit magni blanditiis debitis mollitia odio! Maiores fugiat modi a
          ducimus illum mollitia, repellendus optio ab iure delectus enim,
          laboriosam ea numquam atque animi doloribus nesciunt voluptatem quasi.
          Accusantium sapiente cum sit iusto harum neque rerum, labore eos ea
          quasi porro recusandae eveniet inventore, molestias ratione quos
          distinctio in hic doloribus soluta explicabo placeat debitis at?
          Explicabo corporis natus assumenda esse odio, doloribus quo dicta
          reiciendis dolorem, sed eligendi accusantium quisquam unde tempore
          facilis temporibus. Sed error recusandae consequatur excepturi sequi
          libero quasi nihil nemo dignissimos veritatis. Tempora, laboriosam
          unde culpa quos ex voluptate sunt doloremque, totam possimus
          voluptates asperiores earum iure similique expedita dolorem maxime
          esse placeat ipsum ullam sequi, rem qui! Nostrum enim pariatur
          corrupti distinctio earum doloribus, odio id delectus dolorem beatae
          ad placeat. A assumenda aliquam fugit aliquid magni nemo quos ullam
          doloribus. Animi perferendis perspiciatis magni veniam ab porro neque,
          at veritatis. Non a enim nisi possimus reprehenderit nulla?
        </p>
      </div>
    </div>
  );
}

export default Profile;
