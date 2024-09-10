import React from "react";
import carousel1 from "../../../img/carousel1.jpeg";
import carousel2 from "../../../img/carousel2.jpeg";
import carousel3 from "../../../img/carousel3.jpeg";
import { Link, useParams } from "react-router-dom";

export const MainCarousel = () => {
    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide my-3"
        style={{ width: "100%", height: "600px" }}
        data-bs-ride="false"
        data-bs-interval="false"
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
              alt="image1"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel2}
              className="d-block w-100"
              alt="image2"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={carousel3}
              className="d-block w-100"
              alt="image3"
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
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  };