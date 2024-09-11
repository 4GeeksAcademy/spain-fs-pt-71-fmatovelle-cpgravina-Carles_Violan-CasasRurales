import React from "react";
import PropTypes from "prop-types";

export const ConfirmationButton = ({ text, onClick, buttonClass }) => {
  return (
    <div className="text-center">
      <button type="button" className={buttonClass} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

ConfirmationButton.defaultProps = {
  text: "Confirm",          
  buttonClass: "btn static-btn", 
  onClick: () => {},
};

ConfirmationButton.propTypes = {
  text: PropTypes.string,       
  onClick: PropTypes.func,       
  buttonClass: PropTypes.string, 
};
