import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { BookingForm } from "../component/bookingForm";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [house, setHouse] = useState(null);

  useEffect(() => {
    // Buscar la casa específica según el id en los params
    const selectedHouse = store.houses.find(h => h.id === parseInt(params.theid));
    setHouse(selectedHouse);
  }, [store.houses, params.theid]);

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">{house.name}</h1>
        <p className="lead">{house.address}</p>
        <p>Type: {house.type}</p>

        <div id="carouselHouseImages" className="carousel slide my-3">
          <div className="carousel-inner">
            {house.image1 && (
              <div className="carousel-item active">
                <img src={house.image1} className="d-block w-100" alt="House 1" />
              </div>
            )}
            {house.image2 && (
              <div className="carousel-item">
                <img src={house.image2} className="d-block w-100" alt="House 2" />
              </div>
            )}
            {house.image3 && (
              <div className="carousel-item">
                <img src={house.image3} className="d-block w-100" alt="House 3" />
              </div>
            )}
            {house.image4 && (
              <div className="carousel-item">
                <img src={house.image4} className="d-block w-100" alt="House 4" />
              </div>
            )}
          </div>
          {house.image1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselHouseImages"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselHouseImages"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

        <h3>Features</h3>
        <ul>
          <li>Square Meters: {house.features?.square_meters}</li>
          <li>Bedrooms: {house.features?.bedrooms}</li>
          <li>Bathrooms: {house.features?.bathrooms}</li>
          <li>Has Pool: {house.features?.has_pool ? "Yes" : "No"}</li>
          <li>Has Parking: {house.features?.has_parking ? "Yes" : "No"}</li>
        </ul>

        <hr className="my-4" />

        <Link to="/">
          <span className="btn btn-lg static-btn" href="#" role="button">
            Back home
          </span>
        </Link>
      </div>
      <div className="mt-5">
        <BookingForm house={house} />
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
