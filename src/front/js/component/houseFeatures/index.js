import React from "react";
import PropTypes from "prop-types";
import './styles.css'; 

export const HouseFeatures = ({ features }) => {
  return (
    <div className="house-features-container">
      <h3 className="features-title">Features</h3>
      <ul className="features-list"> 
        <li>Square Meters: {features?.square_meters}</li>
        <li>Bedrooms: {features?.bedrooms}</li>
        <li>Bathrooms: {features?.bathrooms}</li>
        <li>Has Pool: {features?.has_pool ? "Yes" : "No"}</li>
        <li>Has Parking: {features?.has_parking ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
};

HouseFeatures.propTypes = {
  features: PropTypes.object.isRequired,
};
