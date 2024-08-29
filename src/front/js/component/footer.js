import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo_test.png";
import "../../styles/home.css";

export const Footer = () => (
  <footer>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 justify-content-center border-top">
      <div className="col mb-3"></div>
      <div className="col mb-3">
        <h5>About us</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/about" className="nav-link p-0 text-body-secondary">
              About
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/terms-and-conditions" className="nav-link p-0 text-body-secondary">
              Terms and conditions
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="privacy-policy" className="nav-link p-0 text-body-secondary">
              Privacy policy
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="cookies-statement" className="nav-link p-0 text-body-secondary">
              Cookies statement
            </Link>
          </li>
        </ul>
      </div>
      <div className="col mb-3">
        <h5>Explore</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/" className="nav-link p-0 text-body-secondary">
              Home
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/top-spain-destinations" className="nav-link p-0 text-body-secondary">
              Top Spain destinations
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/top-portugal-destinations" className="nav-link p-0 text-body-secondary">
              Top Portugal destinations
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="top-france-destinations" className="nav-link p-0 text-body-secondary">
              Top France destinations
            </Link>
          </li>
        </ul>
      </div>

      <div className="col mb-3">
        <h5>Help</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="faqs" className="nav-link p-0 text-body-secondary">
              FAQs
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="cancellation-options" className="nav-link p-0 text-body-secondary">
              Cancellation options
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="contact-us" className="nav-link p-0 text-body-secondary">
              Contact us
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="feedback" className="nav-link p-0 text-body-secondary">
              Leave your feedback
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <Link
          to="/"
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
        >
          <img src={logo} alt="Company Logo" width="30" height="24" />
        </Link>
        <span className="mb-3 mb-md-0 text-body-secondary">
          © 2024 Rural Experience, Inc
        </span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <Link className="text-black" to="contact-us">
            <i className="fa-brands fa-twitter"></i>
          </Link>
        </li>
        <li className="ms-3">
          <Link className="text-black" to="contact-us">
            <i className="fa-brands fa-instagram"></i>
          </Link>
        </li>
        <li className="ms-3">
          <Link className="text-black" to="contact-us">
            <i className="fa-brands fa-facebook"></i>
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);
