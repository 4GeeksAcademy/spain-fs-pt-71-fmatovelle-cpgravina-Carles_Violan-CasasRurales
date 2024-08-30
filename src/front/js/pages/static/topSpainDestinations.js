import React from "react";
import { Link } from "react-router-dom";

export const TopSpainDestinations = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Top Spain Destinations</h1>
      <div className="fs-5 mb-4">
        <p>
          Discover the most beautiful rural spots in Spain. From the serene
          countryside to charming villages, our curated selection of top
          destinations promises an authentic experience of Spain's natural and
          cultural heritage.
        </p>
      </div>
      
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Andalusia</h2>
          <p className="lead fs-5">
            Andalusia is a region of contrasts, with golden beaches, rugged
            mountains, and whitewashed villages. Experience the warmth of
            Spanish hospitality and the region's rich history and culture.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Catalonia</h2>
          <p className="lead fs-5">
            Explore the diverse landscapes of Catalonia, from the scenic
            Pyrenees to the stunning Costa Brava. This region offers a perfect
            blend of nature, culture, and gastronomy.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Galicia</h2>
          <p className="lead fs-5">
            Galicia is known for its lush green hills, wild coastline, and
            unique cultural traditions. Enjoy the tranquility of its rural
            landscapes and the warmth of its welcoming people.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Balearic Islands</h2>
          <p className="lead fs-5">
            The Balearic Islands offer a unique rural experience with their
            stunning beaches, traditional villages, and vibrant local culture.
            It's a perfect escape for those seeking both relaxation and
            adventure.
          </p>
        </div>
      </div>

      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
        Explore our rentals
      </Link>
    </div>
  );
};
