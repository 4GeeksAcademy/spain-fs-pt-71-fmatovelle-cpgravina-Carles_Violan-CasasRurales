import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import imageProfile from "../../img/profile.png";
import "../../styles/home.css"; // Asegúrate de que tus estilos están bien configurados

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
    return <div className="text-center mt-5">LOADING.....</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* User Information Card */}
        <div className="col-md-4">
          <div className="card">
            <img src={imageProfile} className="card-img-top" alt="Profile" />
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
        </div>

        {/* Reservations List */}
        <div className="col-md-8">
          <h2>Your Reservations</h2>
          {reservations && reservations.length > 0 ? (
            <ul className="list-group">
              {reservations.map((reservation, index) => (
                <li key={index} className="list-group-item">
                  <h5>Reservation ID: {reservation.id}</h5>
                  <p><strong>Start Date:</strong> {reservation.startDate}</p>
                  <p><strong>End Date:</strong> {reservation.endDate}</p>
                  <div>
                    <strong></strong>
                    <img src={reservation.house.image1} alt={reservation.house.name} className="img-fluid mt-2" style={{ maxWidth: '200px' }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
