import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Protected = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getCurrentUser();
    }, []);

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
