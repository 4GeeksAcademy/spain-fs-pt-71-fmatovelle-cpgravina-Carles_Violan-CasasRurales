import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Protected = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getCurrentUser();
    }, []);

    useEffect(() => {
        if (!store.currentUser) {
            navigate('/'); // Redirect if no user is logged in
        }
    }, [store.currentUser, navigate]); // Dependency on store.currentUser

    return (
        <div className="text-center mt-5">
            <h1>Protected Route!!</h1>
            <p>
                <img src={rigoImageUrl} alt="default icon" />
            </p>
            <div className="alert alert-info">
                {store.message || "Loading message from the backend (make sure your python backend is running)..."}
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
