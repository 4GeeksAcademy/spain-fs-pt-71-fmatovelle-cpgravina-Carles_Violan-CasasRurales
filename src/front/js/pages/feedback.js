import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ConfirmationButton } from "../component/confirmationButton";

export const Feedback = () => {
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ratings, setRatings] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !ratings) {
      alert("Please fill out all required fields.");
      return;
    }

    const success = await actions.submitFeedback(name, email, ratings, message);
    if (success) {
      alert("Feedback submitted successfully.");
      // Reset form or redirect
    } else {
      alert("Failed to submit feedback, please try again.");
    }
  };

  return (
    <div className="container mt-5 py-5">
      <h1 className="mb-4 text-center">Feedback Form</h1>
      <p className="fs-5">
        Are you satisfied with the Rental Experience website? Please leave us a
        feedback to help us improve our services and provide the best customer
        experience.
      </p>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded border-none"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <fieldset className="mb-4">
              <legend className="form-label">
                What is your overall impression?{" "}
                <span className="text-danger">*</span>
              </legend>
              <div className="table-responsive">
                <table className="table table-bordered table-sm col-lg-6 col-sm-12">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-center">Very Satisfied</th>
                      <th className="text-center">Satisfied</th>
                      <th className="text-center">Unsatisfied</th>
                      <th className="text-center">Very Unsatisfied</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle">Overall satisfaction</td>
                      <td className="text-center">
                        <input
                          type="radio"
                          name="ratings"
                          value="very_satisfied"
                          onChange={(e) => setRatings(e.target.value)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="radio"
                          name="ratings"
                          value="satisfied"
                          onChange={(e) => setRatings(e.target.value)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="radio"
                          name="ratings"
                          value="unsatisfied"
                          onChange={(e) => setRatings(e.target.value)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="radio"
                          name="ratings"
                          value="very_unsatisfied"
                          onChange={(e) => setRatings(e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>

            <div className="mb-3">
              <label htmlFor="comments" className="form-label">
                Feel free to add any other comments or suggestions:
              </label>
              <textarea
                id="comments"
                className="form-control"
                rows="5"
                placeholder="Your comments here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <ConfirmationButton
              text="Send Feedback"
              onClick=""
              buttonClass="btn search-button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
