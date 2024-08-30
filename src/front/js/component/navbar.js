import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.jpeg";
import "../../styles/home.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("");

  useEffect(() => {
    actions.getCurrentUser();
  }, [actions]);

  const handleLogout = async () => {
    await actions.logout(navigate);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log({ destination, checkInDate, checkOutDate, guests });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-text-top"
              style={{ width: "auto", height: "65px" }}
            />
            <span className="brand-name ms-2 fs-1 fw-bold">Rural Experience</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarToggler"
          >
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn m-1 globe-button"
                data-bs-toggle="modal"
                data-bs-target="#createNewPostModal"
                style={{ width: "70px", height: "auto" }}
              >
                <i className="fa-solid fa-globe"></i>
              </button>
              <div className="dropdown m-1">
                <button
                  className="btn dropdown-toggle user-button"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: "70px", height: "auto" }}
                >
                  <i className="fa-regular fa-user"></i>
                </button>
                <ul className="dropdown-menu fs-6 dropdown-menu-end mt-2 rounded">
                  {store.currentUser ? (
                    <>
                      <p className="dropdown-item">Welcome, {store.currentUser.userName}</p>
                      <li>
                        <Link className="dropdown-item" to="/traveler/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="traveler/favorites">
                          Favorites
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item my-2" to="privacy-policy">
                          Privacy policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item border-top border-danger"
                          to="#"
                          onClick={handleLogout}
                        >
                          Log out
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                      <Link className="dropdown-item " to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="bar d-flex align-items-center justify-content-between mx-auto my-5 shadow p-1">
        <div className="location flex-grow-1 px-4">
          <p className="mb-1 text-primary-emphasis mt-2">Location</p>
          <input
            type="text"
            className="form-control-plaintext text-secondary mb-1"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="check-in flex-grow-1 px-4 border-start">
          <p className="mb-1 text-primary-emphasis mt-2">Check in</p>
          <input
            type="date"
            className="form-control-plaintext text-secondary mb-1"
            placeholder="Add dates"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="check-out flex-grow-1 px-4 border-start">
          <p className="mb-1 text-primary-emphasis mt-2">Check out</p>
          <input
            type="date"
            className="form-control-plaintext text-secondary mb-1"
            placeholder="Add dates"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div className="guests flex-grow-1 px-4 border-start position-relative">
          <p className="mb-1 text-primary-emphasis mt-2">Guests</p>
          <input
            type="number"
            className="form-control-plaintext mb-1"
            placeholder="Add guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <button
            className="btn  position-absolute end-0 top-50 translate-middle-y rounded-circle p-3 search-icon"
            style={{ width: "60px", height: "auto" }}
            onClick={handleSearch}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </header>
  );
};
