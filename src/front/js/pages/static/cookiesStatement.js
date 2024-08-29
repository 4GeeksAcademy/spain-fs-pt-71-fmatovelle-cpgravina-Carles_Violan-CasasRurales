import React from "react";
import { Link } from "react-router-dom";

export const CookiesStatement = () => {
  return (
    <div className="container text-center mt-5 py-5">
      <h1 className="mb-4">Cookies Statement</h1>
      <div className="fs-5 mb-4">
        <p>
          At Rural Experience, we use cookies to enhance your browsing experience and to ensure that our website functions effectively.
        </p>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">1. What Are Cookies?</h2>
          <p className="lead fs-5">
            Cookies are small text files that are stored on your device when you visit a website. They help us recognize your device and store information about your preferences or past actions on our site.
          </p>
          <p className="fw-light fs-5">
            These cookies do not typically contain any information that personally identifies you, but the information stored may be linked to your personal data that we collect through other means.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">2. How We Use Cookies</h2>
          <p className="fw-light fs-5">
            We use cookies for a variety of reasons, including to improve our website’s functionality, to remember your preferences, and to analyze how our website is used. This helps us provide you with a better experience and make improvements where necessary.
          </p>
          <p className="fw-light fs-5">
            Some cookies are essential for the operation of our website, enabling you to navigate and use its features. Other cookies allow us to enhance your experience by storing your preferences and providing personalized content.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">3. Managing Cookies</h2>
          <p className="fw-light fs-5">
            Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Please note that if you disable cookies, certain features of our website may not function correctly.
          </p>
          <p className="fw-light fs-5">
            You can also manage your cookie preferences through our website’s cookie consent tool, which allows you to accept or reject specific types of cookies.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <h2 className="h4 mb-3">4. Third-Party Cookies</h2>
          <p className="fw-light fs-5">
            We may also use third-party cookies to help us analyze usage, manage our advertisements, and improve our marketing efforts. These cookies are placed by third-party companies and may collect data about your online activities across different websites.
          </p>
          <p className="fw-light fs-5">
            We do not control these third-party cookies and recommend that you review the privacy policies of these third-party services to understand how they use your information.
          </p>
        </div>
      </div>

      <Link to="/" className="static-btn btn mt-4 px-4 py-2 fs-5">
      Return home
      </Link>
    </div>
  );
};
