import React, { useState } from 'react';

const TripSummary = ({ house, startDate, endDate, guests, onGuestsChange, onStartDateChange, onEndDateChange, isEditing, setIsEditing }) => {
  const [tempGuests, setTempGuests] = useState(guests);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);


  const handleSave = () => {
    onGuestsChange(tempGuests);
    onStartDateChange(tempStartDate);
    onEndDateChange(tempEndDate);
    setIsEditing(false); // Exit editing mode
  };


  const handleCancel = () => {
    setTempGuests(guests);
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setIsEditing(false); // Exit editing mode without saving
  };

  return (
    <div className="trip-summary">
      <img src={house.image1} alt="House Image" className="trip-summary-img" />

      <div className="trip-summary-details">
        <h3>Trip Summary</h3>
        <p>
          <strong>House ID:</strong> {house.id}
        </p>
        <div className="trip-summary-divider"></div>

        {isEditing ? (
          <>
            <div className="form-group">
              <label><strong>Guests:</strong></label>
              <div className="guest-count-controls">
                <button onClick={() => setTempGuests(Math.max(1, tempGuests - 1))} className="guest-count-button">-</button>
                <input
                  type="number"
                  min="1"
                  value={tempGuests}
                  onChange={(e) => setTempGuests(Math.max(1, parseInt(e.target.value) || 1))}
                  className="guest-count-input"
                />
                <button onClick={() => setTempGuests(tempGuests + 1)} className="guest-count-button">+</button>
              </div>
            </div>

            <div className="form-group">
              <label><strong>Start Date:</strong></label>
              <input
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                className="date-input"
              />
            </div>

            <div className="form-group">
              <label><strong>End Date:</strong></label>
              <input
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                className="date-input"
              />
            </div>

            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={handleCancel} className="edit-button">Cancel</button>
          </>
        ) : (
          <>
            <p>
              <strong>Guests:</strong> {guests} guest{guests > 1 ? 's' : ''}
            </p>
            <p>
              <strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
            </p>
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TripSummary;
