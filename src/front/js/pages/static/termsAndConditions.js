import React from "react";
import { Link } from "react-router-dom";

export const TermsAndConditions = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Terms and Conditions</h1>
      <div className="fs-5 mb-4">
        <p>
          Welcome to Rural Experience. Please read these Terms and Conditions carefully before using our website and services.
        </p>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">1. Acceptance of Terms</h2>
          <p className="lead fs-5">
            By accessing or using the Rural Experience website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you should not use our services.
          </p>
          <p className="fw-light fs-5">
            We reserve the right to modify these Terms and Conditions at any time. It is your responsibility to review them periodically for any changes. Your continued use of our services after any changes constitutes your acceptance of the updated terms.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">2. Booking and Payments</h2>
          <p className="fw-light fs-5">
            All bookings made through Rural Experience are subject to availability and confirmation. You will receive a confirmation email once your booking is successfully processed. Payments must be made through the provided payment methods on our website.
          </p>
          <p className="fw-light fs-5">
            Please ensure that the information provided during the booking process is accurate. Any discrepancies may affect the validity of your booking.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">3. Cancellations and Refunds</h2>
          <p className="fw-light fs-5">
            Cancellations must be made in accordance with the cancellation policy specified for your booking. Refunds, if applicable, will be processed according to our refund policy.
          </p>
          <p className="fw-light fs-5">
            We reserve the right to cancel bookings under certain circumstances, such as but not limited to issues with the property or unforeseen circumstances. In such cases, a full refund will be provided.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">4. User Responsibilities</h2>
          <p className="fw-light fs-5">
            Users are responsible for their behavior and actions while using our services. This includes ensuring that the property is used in a respectful manner and complying with any rules or guidelines provided by the property owner.
          </p>
          <p className="fw-light fs-5">
            Any damages or losses incurred during your stay may result in additional charges. It is your responsibility to report any issues to Rural Experience or the property owner promptly.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">5. Limitation of Liability</h2>
          <p className="fw-light fs-5">
            Rural Experience is not liable for any indirect, incidental, or consequential damages that may arise from the use of our services. Our liability is limited to the maximum extent permitted by law.
          </p>
          <p className="fw-light fs-5">
            We make no warranties or representations regarding the accuracy or reliability of the information provided on our website or the quality of the properties listed.
          </p>
        </div>
      </div>

      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
        Return home
      </Link>
    </div>
  );
};
