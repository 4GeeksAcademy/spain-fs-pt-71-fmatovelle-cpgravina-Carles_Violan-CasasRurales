import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingsCalendar } from "./bookingsCalendar";
import { Context } from "../store/appContext";
import { Modal } from "./Modal";

export const BookingForm = ({ house }) => {
  const { actions } = useContext(Context);
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleDateChange = (start, end) => {
    setDates({ startDate: start, endDate: end });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dates.startDate && dates.endDate) {
      actions.setBookingDetails(house, dates.startDate, dates.endDate);
      navigate("/Checkout");
    } else {
      setModalTitle("Dates Required");
      setModalMessage(
        "Please select both a start and end date to proceed with your booking."
      );
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
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};
