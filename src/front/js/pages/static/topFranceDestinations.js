import React from "react";
import { Link } from "react-router-dom";

export const TopFranceDestinations = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Top France Destinations</h1>
      <div className="fs-5 mb-4">
        <p>
          Explore the breathtaking countryside of France, where rustic charm
          and natural beauty create the perfect escape. From rolling vineyards
          to peaceful rural villages, discover the best rural destinations
          France has to offer.
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Provence</h2>
          <p className="lead fs-5">
            Provence is renowned for its lavender fields, sun-drenched villages,
            and rich cultural history. Experience the rustic charm of this
            Mediterranean haven, where the scent of lavender and the beauty of
            the rolling hills create a serene escape.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Loire Valley</h2>
          <p className="lead fs-5">
            The Loire Valley is a UNESCO World Heritage site, famous for its
            majestic châteaux, vineyards, and tranquil rivers. Explore the
            charming countryside, discover historic castles, and enjoy the
            region’s renowned wine and cuisine.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Normandy</h2>
          <p className="lead fs-5">
            Normandy offers a perfect blend of coastal beauty and rural
            tranquility. From its dramatic cliffs to the iconic Mont Saint-Michel,
            the region is steeped in history and is ideal for those seeking both
            adventure and relaxation.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Brittany</h2>
          <p className="lead fs-5">
            Brittany is a land of rugged coastlines, quaint villages, and rich
            Celtic heritage. Its dramatic landscapes, quiet countryside, and
            unique culture make it a top destination for a peaceful rural
            retreat.
          </p>
        </div>
      </div>

      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
        Explore our rentals
      </Link>
    </div>
  );
};
