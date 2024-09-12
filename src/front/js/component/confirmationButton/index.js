import React from "react";
import PropTypes from "prop-types";
import './styles.css'; 

export const ConfirmationButton = ({ text, onClick, buttonClass }) => {
  return (
    <div className="text-center confirmation-button">
      <button type="button" className={buttonClass} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

ConfirmationButton.defaultProps = {
  text: "Confirm",          
  buttonClass: "text-white", 
  onClick: () => {},
};

ConfirmationButton.propTypes = {
  text: PropTypes.string,       
  onClick: PropTypes.func,       
  buttonClass: PropTypes.string, 
};
