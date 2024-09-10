import React from 'react';

// Utility function to format numbers as currency
const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

const PriceDetails = ({ nights, nightlyRate, cleaningFee, serviceFee, guests }) => {

  const additionalGuestRate = 10.00; 
  const accommodationCost = nights * nightlyRate;
  const guestCost = (guests - 1) * additionalGuestRate * nights; 
  const total = accommodationCost + guestCost + cleaningFee + serviceFee;

  return (
    <div className="price-details">
      <h3>Price details</h3>
      <p>{formatCurrency(nightlyRate)} x {nights} night{nights > 1 ? 's' : ''}: {formatCurrency(accommodationCost)}</p>
      {guests > 1 && (
        <p>Additional guest fee: {formatCurrency(additionalGuestRate)} x {nights} nights x {guests - 1} guest{guests - 1 > 1 ? 's' : ''}= {formatCurrency(guestCost)}</p>
      )}
      <p>Cleaning fee: {formatCurrency(cleaningFee)}</p>
      <p>Service fee: {formatCurrency(serviceFee)}</p>
      <h4>Total: {formatCurrency(total)}</h4>
    </div>
  );
};

export default PriceDetails;
