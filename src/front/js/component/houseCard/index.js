import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { ConfirmationButton } from "../confirmationButton";
import "./styles.css";

export const HouseCard = ({ house, index }) => {
  const { actions } = useContext(Context);

  const isFavorite = actions.isFavorite(house.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      actions.removeFavorite(house.id);
    } else {
      actions.addFavorite(house.id);
    }
  };

  return (
    <div
      key={index}
      className="house-card-container col-lg-3 col-md-6 col-sm-12 mb-4"
    >
      <Link
        to={`/singleHouse/${house.id}`}
        className="text-decoration-none text-reset d-block"
      >
        <div className="card rounded">
          <div
            id={`carouselExample${index}`}
            className="carousel slide"
            data-bs-ride="false"
            data-bs-interval="false"
          >
            <div className="carousel-inner">
              {house.image1 && (
                <div className="carousel-item active">
                  <img
                    src={house.image1}
                    className="d-block w-100"
                    alt="House 1"
                  />
                </div>
              )}
              {house.image2 && (
                <div className="carousel-item">
                  <img
                    src={house.image2}
                    className="d-block w-100"
                    alt="House 2"
                  />
                </div>
              )}
              {house.image3 && (
                <div className="carousel-item">
                  <img
                    src={house.image3}
                    className="d-block w-100"
                    alt="House 3"
                  />
                </div>
              )}
              {house.image4 && (
                <div className="carousel-item">
                  <img
                    src={house.image4}
                    className="d-block w-100"
                    alt="House 4"
                  />
                </div>
              )}
            </div>
            {house.image1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carouselExample${index}`}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carouselExample${index}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>

          <div className="card-body">
            <h5 className="card-title fs-5">{house.name}</h5>
            <p className="card-text">{house.address}</p>
            <p className="card-text">Type: {house.type}</p>
            <div className="price-heart-container">
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-euro-sign me-2 fs-5"></i>{" "}
                <p className="card-text mb-0">{house.nightly_rate} night</p>
              </div>
              <div
                onClick={toggleFavorite}
                className={`heart-icon ${isFavorite ? "favorite" : ""}`}
              >
                {/* Conditionally apply the 'favorite' class */}
                <i
                  className={`fa-${
                    isFavorite ? "solid" : "regular"
                  } fa-heart fs-5`}
                ></i>
              </div>
            </div>
          </div>
          <ConfirmationButton
            text="Learn more"
            buttonClass="btn w-100 py-2 text-white"
          />
        </div>
      </Link>
    </div>
  );
};
