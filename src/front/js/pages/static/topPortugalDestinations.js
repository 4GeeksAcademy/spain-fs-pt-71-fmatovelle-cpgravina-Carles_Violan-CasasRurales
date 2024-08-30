import React from "react";
import { Link } from "react-router-dom";

export const TopPortugalDestinations = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Top Portugal Destinations</h1>
      <div className="fs-5 mb-4">
        <p>
          Discover the hidden gems of Portugal's countryside. From rolling
          vineyards to coastal retreats, our selection of top destinations
          offers a perfect blend of nature, culture, and tranquility.
        </p>
      </div>
      
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Alentejo</h2>
          <p className="lead fs-5">
            Alentejo is renowned for its vast plains, charming villages, and
            rich history. Experience the slow pace of rural life, surrounded by
            olive groves, vineyards, and cork forests.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Douro Valley</h2>
          <p className="lead fs-5">
            The Douro Valley, known for its terraced vineyards and scenic river
            views, is a UNESCO World Heritage site. Enjoy wine tastings, river
            cruises, and the serenity of the countryside.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Algarve</h2>
          <p className="lead fs-5">
            Beyond its famous beaches, the Algarve offers a peaceful rural
            experience with its traditional villages, rolling hills, and
            almond groves. It's the perfect spot for relaxation and exploration.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Madeira</h2>
          <p className="lead fs-5">
            Madeira, known as the "Island of Eternal Spring," is a lush,
            mountainous paradise with stunning landscapes, vibrant gardens, and
            rich cultural traditions. It's ideal for nature lovers and
            adventurers alike.
          </p>
        </div>
      </div>

      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
        Explore our rentals
      </Link>
    </div>
  );
};

