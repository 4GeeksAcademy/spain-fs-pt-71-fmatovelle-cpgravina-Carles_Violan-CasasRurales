import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import imageProfile from "../../img/profile.png";
import "../../styles/home.css";

export const Profile = () => {
  const { store } = useContext(Context);
  const { isLoggedIn, isLoadingUser } = store;
  const navigate = useNavigate();

  useEffect(() => {
    async function fecthCurrentUser() {
      if (!isLoadingUser) {
        if (!isLoggedIn) {
          navigate("/login"); // Redirect if no user is logged in
        }
      }
    }
    fecthCurrentUser();
  }, [isLoadingUser]);

  if (isLoadingUser) {
    return <>LOADING.....</>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Welcome, {store.currentUser.userName}</h1>
      <p>
        <img src={imageProfile} alt="default icon" />
      </p>
     
      <div className="profile-info">
        {store.currentUser ? (
          <div>
            <p>{store.currentUser.userName}</p>
            <p>{store.currentUser.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      
    </div>
  );
};
