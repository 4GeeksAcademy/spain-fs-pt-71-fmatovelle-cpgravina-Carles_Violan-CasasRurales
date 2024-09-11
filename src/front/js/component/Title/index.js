import React from "react";
import PropTypes from "prop-types";

export const Title = ({ title, subtitle }) => {
  return (
    <div className="title-container ms-2 mt-5">
      <h1>{title}</h1>
      {subtitle && <p className="subtitle mt-5 mb-5 fs-3">{subtitle}</p>}
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

Title.defaultProps = {
  subtitle: "",
};
