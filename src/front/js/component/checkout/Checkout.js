import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext"; 
import TripSummary from "./TripSummary"; 
import PaymentSection from "./PaymentSection"; 
import AdditionalInfo from "./AdditionalInfo"; 
import PriceDetails from "./PriceDetails"; 
import './styles/Checkout.css'; 

export const Checkout = () => {
  const { store, actions } = useContext(Context);
  const bookingDetails = store.bookingDetails;


  const [selectedPayment, setSelectedPayment] = useState('Transfer'); 


  const [guests, setGuests] = useState(2); 
  const [startDate, setStartDate] = useState(bookingDetails.startDate);
  const [endDate, setEndDate] = useState(bookingDetails.endDate);

  const [isEditing, setIsEditing] = useState(false);


  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };


  const nights = Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  ); 

  const nightlyRate = 31.82; 
  const cleaningFee = 11.05; 
  const serviceFee = 31.41; 

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

        <button
          onClick={() => {
            console.log("Payment confirmed!");
            actions.clearBookingDetails(); 
          }}
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
    </div>
  );
};

export default Checkout;
