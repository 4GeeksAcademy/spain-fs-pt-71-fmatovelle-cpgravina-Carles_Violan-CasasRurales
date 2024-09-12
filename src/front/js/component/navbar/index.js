import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../img/logo.jpeg";
import "./styles.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  

  useEffect(() => {
    actions.getCurrentUser();
  }, []);

  const handleLogout = async () => {
    const success = await actions.logout(navigate);
    if (success) {
      navigate("/");
    }
  };
  

  const handleDestinationChange = (e) => {
    setDestination(e.target.value); // Actualiza el estado del destino en el componente principal
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
              <i className="fa-solid fa-bars"></i>
            </span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarToggler"
          >
            <div className="d-flex justify-content-end">
              <div className="dropdown m-1">
                <button
                  className="btn dropdown-toggle search-button"
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
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="favorites"
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
                        <span
                          className="dropdown-item border-top border-danger"
                          onClick={() => {
                            handleLogout();
                          }}
                        >
                          Log out
                        </span>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Sign up
                      </Link>
                      <Link className="dropdown-item" to="/login">
                        Log in
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
          <div className="col-12 col-md-4 col-lg-4">
            {/* <div className="d-flex flex-wrap input-group shadow">
            <select
                className="form-select"
                style={{ color: "grey" }}
                onChange={handleDestinationChange} // Manejar el cambio de destino
              >
                <option value="">Choose your destination</option>
                <option value="Madrid">Madrid</option>
                <option value="Valencia">Valencia</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Zaragoza">Zaragoza</option>
          </select>
             
              <span
                className="input-group-text border-0 rounded-end-circle search-button"
                id="search-addon"
              >
                <i className="fas fa-search"></i>
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
