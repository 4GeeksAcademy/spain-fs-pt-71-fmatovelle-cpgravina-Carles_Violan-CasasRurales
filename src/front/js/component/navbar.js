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
  }, []);

  const handleLogout = async () => {
    const success = await actions.logout(navigate);
    if (!success) {
      alert("Logout failed, please try again.");
    }
  };

  const handleSearch = () => {
    // Implement search functionality here or remove this section if we will not use a search bar
    console.log({ destination, checkInDate, checkOutDate, guests });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-text-top"
              style={{ width: "auto", height: "65px" }}
            />
            <span className="brand-name ms-2 fs-1 fw-bold">
              Rural Experience
            </span>
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
            <span className="navbar-toggler-icon">
              <i class="fa-solid fa-bars"></i>
            </span>
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
                      <p className="dropdown-item">
                        Welcome, {store.currentUser.userName}
                      </p>
                      <li>
                        <Link className="dropdown-item" to="/traveler/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/traveler/favorites"
                        >
                          Favorites
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item my-2"
                          to="/privacy-policy"
                        >
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
                      <Link className="dropdown-item" to="/login">
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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="d-flex flex-wrap input-group shadow">
              <input
                type="text"
                className="form-control border-top-0 border-bottom-0 border-start-0 rounded-start-pill"
                placeholder="Destination"
                value={destination}
                aria-label="Destination"
                aria-describedby="search-destination"
                onChange={(e) => setDestination(e.target.value)}
              />
              <input
                type="date"
                className="form-control border-top-0 border-bottom-0 border-end-0"
                placeholder="Check-in"
                aria-label="Check-in"
                aria-describedby="search-check-in"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
              <input
                type="date"
                className="form-control border-top-0 border-bottom-0 border-end-0"
                placeholder="Check-out"
                aria-label="Check-out"
                aria-describedby="search-check-out"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
              <input
                type="number"
                className="form-control border-top-0 border-bottom-0 border-end-0 rounded-end-circle"
                placeholder="Guests"
                aria-label="guests"
                aria-describedby="search-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
              <span
                className="input-group-text border-0 rounded-end-circle search-button"
                id="search-addon"
              >
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
