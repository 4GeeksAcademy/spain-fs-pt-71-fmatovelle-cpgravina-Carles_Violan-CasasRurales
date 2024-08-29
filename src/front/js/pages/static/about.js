import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">About Rural Experience</h1>
      <div className="fs-5 mb-4">
        <p>
          Immerse yourself in the tranquility of the countryside and reconnect
          with the simpler pleasures of life.
        </p>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Our Mission</h2>
          <p className="lead fs-5">
            At Rural Experience, we are dedicated to offering exceptional
            escapes from the routine of daily life. Our mission is to curate
            unique and memorable stays in picturesque rural settings, where you
            can experience the true essence of nature and relaxation.
          </p>
          <p className="fw-light fs-5">
            We believe in the power of nature to refresh and rejuvenate. By
            providing a diverse range of rural home rentals, each selected for
            its distinctive character and charm, we aim to create an environment
            that fosters relaxation, adventure, and connection with loved ones.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">What Sets Us Apart?</h2>
          <p className="fw-light fs-5">
            Our collection features homes that embody the beauty and serenity of
            rural life. From cozy cottages to expansive estates, each property
            is meticulously chosen to ensure a high standard of comfort and
            privacy. We prioritize quality and cleanliness, providing a seamless
            experience from booking to departure.
          </p>
          <p className="fw-light fs-5">
            Our dedicated team works tirelessly to uphold our standards and
            assist you throughout your stay, ensuring that every moment of your
            experience with us is exceptional. Whether you're seeking a peaceful
            retreat, an outdoor adventure, or a memorable gathering, Rural
            Experience is here to make it unforgettable.
          </p>
        </div>
      </div>
      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
        Explore our rentals
      </Link>
    </div>
  );
};
