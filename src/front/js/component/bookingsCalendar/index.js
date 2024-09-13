import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import axios from "axios";

export const BookingsCalendar = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      // Make an API call or handle booking logic
      console.log("Booking from", startDate, "to", endDate);
      alert("Booking confirmed from " + startDate.toDateString() + " to " + endDate.toDateString());
    } else {
      alert("Please select both a start and end date.");
    }
  };

  return (
    <div className="container d-flex flex-column m-auto justify-content-center">
      <h2 className="text-center mb-4">Check availability</h2>
      <div className="calendar-container"> {/* Center and align the calendars */}
        {/* Start Date Calendar */}
        <div className="calendar-wrapper p-3 border rounded bg-light">
          <h5 className="text-center">Start Date</h5>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            inline
            excludeDates={disabledDates}
            highlightDates={[{ startDate, endDate }]}
            minDate={new Date()}
            placeholderText="Start Date"
            className="w-100"
          />
        </div>

        {/* End Date Calendar */}
        <div className="calendar-wrapper p-3 border rounded bg-light">
          <h5 className="text-center">End Date</h5>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            inline
            excludeDates={disabledDates}
            minDate={startDate}
            highlightDates={[{ startDate, endDate }]}
            placeholderText="End Date"
            className="w-100"
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={handleSubmit} role="button" className="book-button">
          Book this house
        </button>
      </div>
    </div>
  );
};
