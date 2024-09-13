import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookingsCalendar } from "../bookingsCalendar"; // Adjusted path


import { Context } from "../../store/appContext"; // Adjusted path

import { Modal } from "../Modal"; // Adjusted path


export const BookingForm = ({ house }) => {
  const { actions } = useContext(Context);
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalConfirmText, setModalConfirmText] = useState("");
  const [modalCancelText, setModalCancelText] = useState("");
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
      setModalTitle("Dates are required");
      setModalMessage(
        "Please select both a start and end date to proceed with your booking."
      );
      setModalConfirmText("Select dates");
      setModalCancelText("Close");
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="booking-form">
      <div className="bookings-calendar">
        <BookingsCalendar onDateChange={handleDateChange} />
      </div>
      <button className="btn search-button" onClick={handleSubmit}>
        Book this property
      </button>



      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
        confirmText={modalConfirmText}
        cancelText={modalCancelText}
      />
    </div>
  );
};
