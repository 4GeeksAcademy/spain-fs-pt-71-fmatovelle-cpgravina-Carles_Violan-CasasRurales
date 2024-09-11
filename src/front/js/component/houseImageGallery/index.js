import React from "react";
import PropTypes from "prop-types";

export const HouseImageGallery = ({ images }) => {
  return (
    <div className="row my-3">
      {images.map((image, index) => (
        <div key={index} className="col-6 col-md-3 mb-3">
          <img src={image} className="img-fluid" alt={`House ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

HouseImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};