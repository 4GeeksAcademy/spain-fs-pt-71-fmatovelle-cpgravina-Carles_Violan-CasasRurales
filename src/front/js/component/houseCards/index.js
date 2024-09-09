import React from "react";
import { Link } from "react-router-dom"; 


export const HouseCard = ({ house, index }) => {
    return (
        <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
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
            <h5 className="card-title">{house.name}</h5>
            <p className="card-text">{house.address}</p>
            <p className="card-text">Type: {house.type}</p>
          </div>

          <Link to={`/single/${house.id}`} className="btn search-button">
            Learn more
          </Link>
        </div>
      </div>
    );
  };