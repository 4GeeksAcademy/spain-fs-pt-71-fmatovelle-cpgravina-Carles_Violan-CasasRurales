import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext"; 
import TripSummary from "./TripSummary"; 
import PaymentSection from "./PaymentSection"; 
import AdditionalInfo from "./AdditionalInfo"; 
import PriceDetails from "./PriceDetails"; 
import Modal from "./Modal"; // Import Modal component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './styles/Checkout.css'; 

export const Checkout = () => {
  const { store, actions } = useContext(Context);
  const bookingDetails = store.bookingDetails;
  const navigate = useNavigate(); // Initialize navigate for redirection

  const [selectedPayment, setSelectedPayment] = useState('Transfer'); 
  const [guests, setGuests] = useState(2); 
  const [startDate, setStartDate] = useState(bookingDetails.startDate);
  const [endDate, setEndDate] = useState(bookingDetails.endDate);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const nights = Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  ); 

  const nightlyRate = 31.82; 
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
    return <div>No booking details available.</div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <TripSummary
          house={bookingDetails.house}
          startDate={startDate}
          endDate={endDate}
          guests={guests}
          onGuestsChange={setGuests}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <PaymentSection 
          selectedPayment={selectedPayment} 
          handlePaymentChange={handlePaymentChange} 
        />

        <AdditionalInfo />

        {/* Confirm and Pay Button to Open Modal */}
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
          guests={guests}
        />
      </div>

      {/* Modal for Payment Confirmation */}
      <Modal 
        isVisible={isModalVisible} 
        onClose={handleCancelModal} 
        onConfirm={handleConfirmPayment} 
      />
    </div>
  );
};

export default Checkout;
