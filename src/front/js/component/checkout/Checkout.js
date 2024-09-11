import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Context } from "../../store/appContext"; 
import TripSummary from "./TripSummary"; 
import PaymentSection from "./PaymentSection"; 
import AdditionalInfo from "./AdditionalInfo"; 
import PriceDetails from "./PriceDetails"; 
import Modal from "./Modal";
import './styles/Checkout.css'; 

export const Checkout = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Initialize navigate for redirection
  
  // State for booking details, initialized from store or localStorage
  const [bookingDetails, setBookingDetails] = useState(() => {
    const savedHouse = JSON.parse(localStorage.getItem('house'));
    const savedStartDate = localStorage.getItem('startDate');
    const savedEndDate = localStorage.getItem('endDate');
    const savedGuests = localStorage.getItem('guests');

    return {
      house: savedHouse || store.bookingDetails.house,
      startDate: savedStartDate || store.bookingDetails.startDate,
      endDate: savedEndDate || store.bookingDetails.endDate,
      guests: parseInt(savedGuests) || 2
    };
  });

  const [selectedPayment, setSelectedPayment] = useState('Transfer'); 
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Load booking details from localStorage when the component mounts
  useEffect(() => {
    const savedHouse = JSON.parse(localStorage.getItem('house'));
    const savedStartDate = localStorage.getItem('startDate');
    const savedEndDate = localStorage.getItem('endDate');
    const savedGuests = localStorage.getItem('guests');

    if (savedHouse && savedStartDate && savedEndDate && savedGuests) {
      setBookingDetails({
        house: savedHouse,
        startDate: savedStartDate,
        endDate: savedEndDate,
        guests: parseInt(savedGuests)
      });
    }
  }, []);

  // Save booking details to localStorage whenever they change
  useEffect(() => {
    if (bookingDetails.house) {
      localStorage.setItem('house', JSON.stringify(bookingDetails.house));
      localStorage.setItem('startDate', bookingDetails.startDate);
      localStorage.setItem('endDate', bookingDetails.endDate);
      localStorage.setItem('guests', bookingDetails.guests);
    }
  }, [bookingDetails]);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleUpdateBookingDetails = (newDetails) => {
    setBookingDetails((prev) => ({ ...prev, ...newDetails }));
  };

  const nights = Math.ceil(
    (new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) / (1000 * 60 * 60 * 24)
  ); 

  const nightlyRate = bookingDetails.house?.nightly_rate || 31.82; // Use house's nightly rate or default
  const cleaningFee = 11.05; 
  const serviceFee = 31.41; 

  const handleConfirmPayment = () => {
    console.log("Payment confirmed!");
    actions.clearBookingDetails(); 
    localStorage.removeItem('house');
    localStorage.removeItem('guests');
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    setIsModalVisible(false); // Close modal
    navigate("/"); // Redirect to home
  };

  const handleCancelModal = () => {
    setIsModalVisible(false); // Close modal
  };

  if (!bookingDetails.house) {
    console.log('No booking details available:', bookingDetails);
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
          onGuestsChange={(newGuests) => handleUpdateBookingDetails({ guests: newGuests })}
          onStartDateChange={(newStartDate) => handleUpdateBookingDetails({ startDate: newStartDate })}
          onEndDateChange={(newEndDate) => handleUpdateBookingDetails({ endDate: newEndDate })}
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
