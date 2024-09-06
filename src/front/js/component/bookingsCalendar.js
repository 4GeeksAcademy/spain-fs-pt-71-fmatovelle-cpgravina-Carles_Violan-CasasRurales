import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/home.css";
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

  return (
    <div className="container d-flex m-auto justify-content-center">
      <div className="row mb-4">
      </div>

      <div className="row">
        {/* Start Date Calendar */}
        <div className="col-md-5 mb-4 d-flex justify-content-center align-items-center">
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
        </div>

        {/* End Date Calendar */}
        <div className="col-md-5 mb-4 d-flex justify-content-center align-items-center">
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
      </div>
    </div>
  );
};

