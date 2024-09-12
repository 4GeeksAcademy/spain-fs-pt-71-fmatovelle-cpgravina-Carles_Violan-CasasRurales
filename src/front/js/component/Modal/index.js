import React from "react";

export const Modal = ({ 
  isVisible, 
  onClose, 
  onConfirm, 
  title, 
  subtitle, 
  message,
  confirmText = "Close",
  cancelText = "Close" 
}) => {
  if (!isVisible) return null;

  return (
    <div className={`modal-overlay ${isVisible ? '' : 'hidden'}`}>
      <div className={`modal-content ${isVisible ? '' : 'hidden'}`}>
        <h1>{title}</h1>
        <h5>{subtitle}</h5>
        <p>{message}</p>
        <button onClick={onConfirm} className="confirm-button">{confirmText}</button>
        <button onClick={onClose} className="cancel-button">{cancelText}</button>
      </div>
    </div>
  );
};



