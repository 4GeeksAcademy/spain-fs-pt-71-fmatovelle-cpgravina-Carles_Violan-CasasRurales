import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Protected = () => {
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
      <h1>Protected Route!!</h1>
      <p>
        <img src={rigoImageUrl} alt="default icon" />
      </p>
      <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <div className="profile-info">
        {store.currentUser ? (
          <div>
            <p>Welcome, {store.currentUser.userName}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
    </div>
  );
};
