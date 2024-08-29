import React from "react";
import { Link } from "react-router-dom";

export const PrivacyPolicy = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Privacy Policy</h1>
      <div className="fs-5 mb-4">
        <p>
          Your privacy is important to us at Rural Experience. This Privacy Policy outlines how we collect, use, and protect your personal information.
        </p>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">1. Information We Collect</h2>
          <p className="lead fs-5">
            We collect information that you provide directly to us, such as when you create an account, book a rental, or contact us for support. This information may include your name, email address, phone number, payment information, and any other details necessary for your booking.
          </p>
          <p className="fw-light fs-5">
            We also collect information automatically through your use of our website, such as IP addresses, browser types, and browsing behaviors. This helps us improve our services and user experience.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">2. How We Use Your Information</h2>
          <p className="fw-light fs-5">
            The information we collect is used to process your bookings, manage your account, and provide customer support. We may also use your information to send you promotional materials, updates, and other information that may interest you, but you can opt-out of these communications at any time.
          </p>
          <p className="fw-light fs-5">
            We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us understand user interactions and improve our services.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">3. Sharing Your Information</h2>
          <p className="fw-light fs-5">
            We do not sell or rent your personal information to third parties. However, we may share your information with trusted partners who assist us in operating our website, processing payments, or providing customer service, as long as they agree to keep your information confidential.
          </p>
          <p className="fw-light fs-5">
            We may also disclose your information when required by law or to protect our rights, property, or safety, or that of others.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">4. Data Security</h2>
          <p className="fw-light fs-5">
            We take the security of your personal information seriously. We implement a variety of security measures to protect your data from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">5. Your Choices and Rights</h2>
          <p className="fw-light fs-5">
            You have the right to access, update, or delete your personal information at any time. If you wish to exercise any of these rights, please contact us through the information provided on our website.
          </p>
          <p className="fw-light fs-5">
            You can also manage your preferences for receiving communications from us and opt-out of marketing emails by following the unsubscribe instructions included in each email.
          </p>
        </div>
      </div>

      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
      Return home
      </Link>
    </div>
  );
};
