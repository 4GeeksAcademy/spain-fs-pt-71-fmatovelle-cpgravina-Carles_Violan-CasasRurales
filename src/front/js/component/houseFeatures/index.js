import React from "react";
import PropTypes from "prop-types";

export const HouseFeatures = ({ features }) => {
  return (
    <>
      <h3>Features</h3>
      <ul>
        <li>Square Meters: {features?.square_meters}</li>
        <li>Bedrooms: {features?.bedrooms}</li>
        <li>Bathrooms: {features?.bathrooms}</li>
        <li>Has Pool: {features?.has_pool ? "Yes" : "No"}</li>
        <li>Has Parking: {features?.has_parking ? "Yes" : "No"}</li>
      </ul>
    </>
  );
};

HouseFeatures.propTypes = {
  features: PropTypes.object.isRequired,
};