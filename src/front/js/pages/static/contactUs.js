import React from "react";
import { Link } from "react-router-dom";

export const ContactUs = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Contact Us</h1>
      <div className="fs-5 mb-4">
        <p>
          We’re here to assist you with any questions or concerns you may have.
          Reach out to us, and we’ll get back to you as soon as possible.
        </p>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Get in Touch</h2>
          <p className="lead fs-5">
            Whether you need help with a booking, have a question about our properties, or want to provide feedback, our team is ready to assist you.
          </p>
          <p className="fw-light fs-5">
            <strong>Email:</strong> <a href="mailto:support@ruralexperience.com">ruralexperiencewebsite@gmail.com</a><br />
            <strong>Phone:</strong> +1 (555) 123-4567<br />
            <strong>Address:</strong> 123 Country Lane, Farmville, Countryland, 45678
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Business Hours</h2>
          <p className="lead fs-5">
            Our team is available to assist you during the following hours:
          </p>
          <p className="fw-light fs-5">
            <strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM<br />
            <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br />
            <strong>Sunday:</strong> Closed
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Follow Us</h2>
          <p className="lead fs-5">
            Stay updated with the latest news and offers from Rural Experience by following us on social media.
          </p>
          <p className="fw-light fs-5">
            <strong>Twitter:</strong> <a href="https://twitter.com/ruralexperience" target="_blank" rel="noopener noreferrer">twitter.com/ruralexperience</a><br />
            <strong>Instagram:</strong> <a href="https://instagram.com/ruralexperiencesite" target="_blank" rel="noopener noreferrer">instagram.com/ruralexperiencesite</a><br />
            <strong>Facebook:</strong> <a href="https://facebook.com/ruralexperience" target="_blank" rel="noopener noreferrer">facebook.com/ruralexperience</a><br />
          </p>
        </div>
      </div>
      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
        Return home
      </Link>
    </div>
  );
};
