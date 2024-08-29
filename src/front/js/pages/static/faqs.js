import React from "react";
import { Link } from "react-router-dom";

export const Faqs = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Frequently Asked Questions</h1>
      <div className="fs-5 mb-4">
        <p>
          We’ve compiled some of the most common questions we receive about
          Rural Experience. If you don’t find the answer you’re looking for,
          feel free to reach out to us directly.
        </p>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Booking and Reservations</h2>
          <p className="fw-light fs-5">
            <strong>How do I book a rental?</strong><br />
            Booking a rental is simple! Browse our available homes, select your
            desired dates, and complete the booking process online. You will
            receive a confirmation email once your reservation is finalized.
          </p>
          <p className="fw-light fs-5">
            <strong>Can I modify or cancel my reservation?</strong><br />
            Yes, you can modify or cancel your reservation by logging into your
            account. Please note that our cancellation policy varies depending
            on the property and booking dates. Be sure to review the policy when
            making changes.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">During Your Stay</h2>
          <p className="fw-light fs-5">
            <strong>What amenities are provided?</strong><br />
            Each of our properties is fully equipped with the essentials,
            including kitchenware, bed linens, and toiletries. Specific
            amenities vary by property, so be sure to check the listing for
            detailed information.
          </p>
          <p className="fw-light fs-5">
            <strong>Is there a contact person available during my stay?</strong><br />
            Absolutely! Our team is available 24/7 to assist you during your
            stay. You will be provided with contact information for a local
            representative who can address any issues or questions.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">Payment and Fees</h2>
          <p className="fw-light fs-5">
            <strong>What payment methods are accepted?</strong><br />
            We accept major credit cards, including Visa, MasterCard, and
            American Express. Payment is required at the time of booking to
            secure your reservation.
          </p>
          <p className="fw-light fs-5">
            <strong>Are there any additional fees?</strong><br />
            Some properties may include additional fees such as cleaning or
            security deposits. All fees will be clearly outlined before you
            finalize your booking.
          </p>
        </div>
      </div>

      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
        Return home
      </Link>
    </div>
  );
};
