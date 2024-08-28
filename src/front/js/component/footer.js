import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo_test.png";
import "../../styles/home.css";

export const Footer = () => (
  <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 m-5 border-top">
    <div className="col mb-3">
      <Link
        to="/"
        className="d-flex align-items-center mb-3 text-body-secondary"
      >
        <img
          src={logo}
          alt="Bootstrap Logo"
          width="40"
          height="32"
          className="bi me-2"
		  style={{ width: 'auto', height: '50px'}}
        />
      </Link>
      <p className="text-body-secondary">© 2024</p>
    </div>

    <div className="col mb-3"></div>

    <div className="col mb-3">
      <h5>About us</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            About
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Terms and conditions
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Privacy policy
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Cookies statement
          </Link>
        </li>
      </ul>
    </div>

    <div className="col mb-3">
      <h5>Explore</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Our top picks
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Recently booked
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Rentals in Spain
          </Link>
        </li>
      </ul>
    </div>

    <div className="col mb-3">
      <h5>Help</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
		  FAQs
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Cancellation options
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Leave a review
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="#" className="nav-link p-0 text-body-secondary">
            Leave your feedback
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);
