import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Context } from "../../store/appContext";
import TripSummary from "./TripSummary";
import PaymentSection from "./PaymentSection";
import AdditionalInfo from "./AdditionalInfo";
import PriceDetails from "./PriceDetails";
import Modal from "./Modal";
import "./styles/Checkout.css";

export const Checkout = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const { store, actions } = useContext(Context);
  const { bookingDetails: bookingDetailsInit } = store;

  const [bookingDetails, setBookingDetails] = useState(() => {
    const savedHouse = bookingDetailsInit.house;
    const savedStartDate = bookingDetailsInit.startDate;
    const savedEndDate = bookingDetailsInit.endDate;
    return {
      house: savedHouse || store.bookingDetails.house,
      startDate: savedStartDate || store.bookingDetails.startDate,
      endDate: savedEndDate || store.bookingDetails.endDate,
      guests: 2,
    };
  });

  const [selectedPayment, setSelectedPayment] = useState("Transfer");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/login"); //codigo god    
    const savedHouse = bookingDetailsInit.house;
    const savedStartDate = bookingDetailsInit.startDate;
    const savedEndDate = bookingDetailsInit.endDate;
    const savedGuests = 2;
    if (savedHouse && savedStartDate && savedEndDate && savedGuests) {
      setBookingDetails({
        house: savedHouse,
        startDate: savedStartDate,
        endDate: savedEndDate,
        guests: savedGuests,
      });
    }
  }, []);

  useEffect(() => {
    if (bookingDetails.house) {
      actions.setBookingDetails(bookingDetails.house, bookingDetails.startDate, bookingDetails.endDate);
    }
  }, [bookingDetails]);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleUpdateBookingDetails = (newDetails) => {
    setBookingDetails((prev) => ({ ...prev, ...newDetails }));
  };

  const nights = Math.ceil(
    (new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) /
      (1000 * 60 * 60 * 24)
  );

  const nightlyRate = bookingDetails.house?.nightly_rate || 31.82; // Use house's nightly rate or default
  const cleaningFee = 11.05;
  const serviceFee = 31.41;

  const handleConfirmPayment = () => {
    console.log("Payment confirmed!");
    actions.clearBookingDetails();
    setIsModalVisible(false); // Close modal
    navigate("/"); // Redirect to home
  };

  const handleCancelModal = () => {
    setIsModalVisible(false); // Close modal
  };

  if (!bookingDetails.house) {
    console.log("No booking details available:", bookingDetails);
    return <div>No booking details available.</div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <TripSummary
          house={bookingDetails.house}
          startDate={bookingDetails.startDate}
          endDate={bookingDetails.endDate}
          guests={bookingDetails.guests}
          onGuestsChange={(newGuests) =>
            handleUpdateBookingDetails({ guests: newGuests })
          }
          onStartDateChange={(newStartDate) =>
            handleUpdateBookingDetails({ startDate: newStartDate })
          }
          onEndDateChange={(newEndDate) =>
            handleUpdateBookingDetails({ endDate: newEndDate })
          }
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <PaymentSection
          selectedPayment={selectedPayment}
          handlePaymentChange={handlePaymentChange}
        />

        <AdditionalInfo />

        <button
          onClick={() => setIsModalVisible(true)}
          className="confirm-pay-button"
        >
          Confirm and Pay
        </button>
      </div>

      <div className="checkout-right">
        <PriceDetails
          nights={nights}
          nightlyRate={nightlyRate}
          cleaningFee={cleaningFee}
          serviceFee={serviceFee}
          guests={bookingDetails.guests}
        />
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={handleCancelModal}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
};

export default Checkout;