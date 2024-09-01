import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import carousel1 from "../../img/carousel1.jpeg";
import carousel2 from "../../img/carousel2.jpeg";
import carousel3 from "../../img/carousel3.jpeg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllHouses();
  }, []);

  if (!store.houses || store.houses.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* // Carousel */}

      <div
        id="carouselExampleIndicators"
        className="carousel slide my-3"
        style={{ width: "100%", height: "600px" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={carousel1}
              className="d-block w-100"
              alt="..."
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel2}
              className="d-block w-100"
              alt="..."
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel3}
              className="d-block w-100"
              alt="..."
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
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
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* cards */}

	  <div>
		<h1 className="ms-5">Experience the beauty of rural life</h1>
		{/* cards */}
    <div className="container m-5 d-flex">
      {store.houses.map((house, index) => (
        <div key={index} className="card rounded mb-4 me-5" style={{ width: "18rem" }}>
          <div id={`carouselExample${index}`} className="carousel slide">
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
                  data-bs-target={`#carouselExample${index}`}
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carouselExample${index}`}
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
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
        </div>
      ))}
    </div>
	  {/* end of cards */}
	  </div>
    </div>
  );
};
