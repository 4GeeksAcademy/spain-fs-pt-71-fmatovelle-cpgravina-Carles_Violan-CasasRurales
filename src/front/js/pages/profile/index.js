import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import imageProfile from "../../../img/profile.png";
import "./styles.css"; // Ensure the path is correct

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const { isLoggedIn, isLoadingUser, reservations } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate ("/login") //codigo god
    async function fetchCurrentUser() {
      if (!isLoadingUser) {
        if (!isLoggedIn) {
          navigate("/login");
        } else {
          await actions.getUserReservations();
        }
      }
    }
    fetchCurrentUser();
  }, [isLoadingUser]);

  if (isLoadingUser) {
    return <div className="text-center mt-5">LOADING.....</div>;
  }

  return (
    <div className="profile-container">
      {/* User Information */}
      <div className="user-info-card">
        <img src={imageProfile} alt="Profile" />
        <div className="card-body">
          <h5 className="card-title">User Information</h5>
          {store.currentUser ? (
            <div>
              <p><strong>Username:</strong> {store.currentUser.userName}</p>
              <p><strong>Email:</strong> {store.currentUser.email}</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>

      {/* Reservations List */}
      <div className="reservations-list">
        {reservations && reservations.length > 0 ? (
          reservations.map((reservation, index) => (
            <div key={index} className="reservation-card">
              <img src={reservation.house.image1} alt={reservation.house.name} className="reservation-image" />
              <h5>Reservation ID: {reservation.id}</h5>
              <p><strong>Start Date:</strong> {reservation.startDate}</p>
              <p><strong>End Date:</strong> {reservation.endDate}</p>
              <p><strong>Location:</strong> {reservation.house.address}</p>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
};
