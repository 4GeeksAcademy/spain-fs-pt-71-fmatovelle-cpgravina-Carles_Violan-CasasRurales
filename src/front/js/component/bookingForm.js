import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingsCalendar } from "./bookingsCalendar";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const BookingForm = ({ house }) => {
  const { actions } = useContext(Context);
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleDateChange = (start, end) => {
    setDates({ startDate: start, endDate: end });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dates.startDate && dates.endDate) {
      actions.setBookingDetails(house, dates.startDate, dates.endDate);
      navigate("/checkout");
    } else {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="booking-form">
      <h2>Check availability</h2>
      <BookingsCalendar onDateChange={handleDateChange} />

      <button
        className="btn search-button btn-lg mb-5"
        onClick={handleSubmit}
        role="button"
      >
        Book this house
      </button>

      {/* Modal */}
      {isModalVisible && (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Dates Required</h5>
                <button
                  type="button"
                  className="close static-btn"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Please select both a start and end date to proceed with your
                  booking.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn static-btn"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
