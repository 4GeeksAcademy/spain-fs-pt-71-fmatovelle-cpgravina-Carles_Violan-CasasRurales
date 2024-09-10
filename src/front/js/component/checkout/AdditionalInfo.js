import React from 'react';

const AdditionalInfo = () => {
  return (
    <div className="additional-info">
      <h3>Required for your trip</h3>
      <div className="info-section">
        <h6>Phone number</h6>
        <p>Add and confirm your phone number to get trip updates.</p>
        <input 
          type="text" 
          placeholder="Add your phone number" 
          className="info-input"
        />
      </div>

      <div className="info-divider"></div> 
      
      <div className="info-section">
        <h3>Cancellation policy</h3>
        <p>Free cancellation 1 week before reservation. Cancel 3 days before for a partial refund.</p>
      </div>

      <div className="info-divider"></div> 
      
      <div className="info-section">
        <h3>Ground rules</h3>
        <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
        <ul>
          <li>Follow the house rules</li>
          <li>Treat your host's home like your own</li>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalInfo;
