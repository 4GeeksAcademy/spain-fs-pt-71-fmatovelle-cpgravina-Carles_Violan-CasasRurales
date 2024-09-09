import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Checkout = () => {
  const { store } = useContext(Context);
  const bookingDetails = store.bookingDetails;

  if (!bookingDetails.house) {
    return <div>No booking details available.</div>;
  }

  return (
    <div>
      <h2>Checkout</h2>
      <p>
        <strong>House ID:</strong> {bookingDetails.house.id}
      </p>

      {bookingDetails.house.image1 && (
        <div>
          <img
            src={bookingDetails.house.image1}
            alt="House Image"
            style={{ width: "300px", height: "auto" }}
          />
        </div>
      )}

      <p>
        <strong>Start Date:</strong>{" "}
        {new Date(bookingDetails.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong>{" "}
        {new Date(bookingDetails.endDate).toLocaleDateString()}
      </p>
      <button
        className="btn search-button btn-lg mb-5"
        onClick=""
        role="button"
      >
        Book this house
      </button>
    </div>
  );
};
