import React from 'react';

const PaymentSection = ({ selectedPayment, handlePaymentChange }) => {
  return (
    <div className="payment-section">
      <h3>Pay with</h3>


      <div className="payment-options">
        <select value={selectedPayment} onChange={handlePaymentChange} className="payment-select">
          <option value="Transfer">Bank Transfer</option>
          <option value="Soon">More payment options soon</option>
        </select>
      </div>


      <div className="payment-details">
        {selectedPayment === 'Transfer' && (
          <div className="transfer-info">
            <p><strong>Iban Number:</strong> ES82 0081 0200 2700 0429 </p>
            <p><strong>Swift Code:</strong> BSABESBV</p>
            <p><strong>Recipient:</strong> Rural Experience</p>
            <p><strong>*</strong> We will continue with reservation once payment transaction details is sent to support@ruralexperience.com</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSection;
