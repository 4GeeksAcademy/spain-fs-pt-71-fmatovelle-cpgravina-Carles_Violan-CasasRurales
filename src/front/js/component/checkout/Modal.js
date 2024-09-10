import React from 'react';

const Modal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className={`modal-overlay ${isVisible ? '' : 'hidden'}`}>
      <div className={`modal-content ${isVisible ? '' : 'hidden'}`}>
        <h1>Confirm Payment</h1>
        <h5>Are you sure you want to confirm your payment?</h5>
        <p>We will continue with reservation once payment transaction details is sent to support@ruralexperience.com</p>
        <button onClick={onConfirm} className="confirm-button">Confirm</button>
        <button onClick={onClose} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
