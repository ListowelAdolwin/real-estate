import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("Current user: ", currentUser);
  return (
    <div>
      <h1 className="underline">Profile</h1>
      {currentUser ? (
        <div>
          <p>{currentUser.data.username}</p>
          <p>{currentUser.data.email}</p>{" "}
        </div>
      ) : (
        <div> No logged in user</div>
      )}
    </div>
  );
}

export default Home;
