import React from "react";
import { Link } from "react-router-dom";

export const CancellationOptions = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Cancellation Options</h1>
      <div className="fs-5 mb-4">
        <p>
          Understanding our cancellation policy will help you make informed decisions about your booking.
        </p>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Flexible Cancellation Policy</h2>
          <p className="lead fs-5">
            For bookings made with our flexible cancellation policy, you can cancel your reservation up to 48 hours before the check-in date for a full refund. Cancellations made within 48 hours of check-in will incur a cancellation fee equal to one night’s stay.
          </p>
          <p className="fw-light fs-5">
            <strong>How to Cancel:</strong><br />
            To cancel your reservation, please log into your account, go to your bookings, and select the cancellation option. Alternatively, you can contact our support team for assistance.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Non-Refundable Bookings</h2>
          <p className="lead fs-5">
            Non-refundable bookings require payment in full at the time of reservation. These bookings cannot be canceled or modified, and no refunds will be issued for cancellations.
          </p>
          <p className="fw-light fs-5">
            <strong>How to Cancel:</strong><br />
            Unfortunately, non-refundable bookings cannot be canceled or modified. If you have any concerns, please contact our support team, but note that refunds are not possible for these reservations.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Special Circumstances</h2>
          <p className="lead fs-5">
            In the event of extenuating circumstances, such as natural disasters or travel restrictions, we will review cancellation requests on a case-by-case basis. Please reach out to our support team with relevant documentation for consideration.
          </p>
          <p className="fw-light fs-5">
            <strong>How to Apply:</strong><br />
            Contact our support team directly to discuss your situation. We will work with you to provide the best possible solution based on the circumstances.
          </p>
        </div>
      </div>
      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
        Return home
      </Link>
    </div>
  );
};
