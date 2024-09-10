import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import imageProfile from "../../img/profile.png";
import "../../styles/home.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const { isLoggedIn, isLoadingUser, reservations } = store;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCurrentUser() {
      if (!isLoadingUser) {
        if (!isLoggedIn) {
          navigate("/login"); // Redirect if no user is logged in
        } else {
          // Llamar a la acción para obtener las reservas si el usuario está logueado
          await actions.getUserReservations();
         // await actions.getAllHouses();
        }
      }
    }
    fetchCurrentUser();
  }, [isLoadingUser]);

  if (isLoadingUser) {
    return <>LOADING.....</>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Welcome, {store.currentUser ? store.currentUser.userName : "Guest"}</h1>
      <p>
        <img src={imageProfile} alt="default icon" />
      </p>

      <div className="profile-info">
        {store.currentUser ? (
          <div>
            <p><strong>Username:</strong> {store.currentUser.userName}</p>
            <p><strong>Email:</strong> {store.currentUser.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      {/* Mostrar las reservas */}
      <div className="reservations-section mt-4">
        <h2>Your Reservations</h2>
        {reservations && reservations.length > 0 ? (
  <ul>
    {reservations.map((reservation, index) => (
      <li key={index}>
        <p><strong>Reservation ID:</strong> {reservation.id}</p>
        <p><strong>Start Date:</strong> {reservation.startDate}</p>
        <p><strong>End Date:</strong> {reservation.endDate}</p>
        <div>
          <strong>House Image:</strong>
          <img src={reservation.house.image1} alt={reservation.house.name} style={{ width: '200px', height: 'auto' }} />
        </div>
      </li>
    ))}
  </ul>
) : (
  <p>No reservations found.</p>
)}
      </div>
      
    </div>
  );
};
