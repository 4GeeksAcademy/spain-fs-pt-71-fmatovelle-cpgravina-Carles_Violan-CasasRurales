import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Title } from "../component/Title";
import { ConfirmationButton } from "../component/confirmationButton";
import logo from "../../img/logo.jpeg";

export const Register = () => {
  const { actions } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Check if any field is empty
    if (!userName || !email || !password) {
      setMessage("All fields are required.");
      setMessageType("error");
      return;
    }
  
    // Check if email contains '@'
    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    const { success } = await actions.register(userName, email, password);

    if (success) {
      
      setMessage("Registration successful!");
      setMessageType("success");
      navigate("/");
      
    } else {
      setMessage(
        "An error has occurred during registration. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="form-signin w-100 m-auto mt-5 pt-5">
      <form>
        <img
          className="mb-4"
          src={logo}
          alt="logo"
          style={{ width: "72px", height: "72px" }}
        />
        <Title title="Please sign up" />
         {/* Inline Message Display */}
         {message && (
          <p
            style={{
              color: messageType === "success" ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        <div className="form-floating mt-5">
          <input
            type="text"
            className="form-control"
            id="floatingInput1"
            placeholder="name@example.com"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput2"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <ConfirmationButton
          text="Sign up" 
          buttonClass="btn w-100 py-2 text-white"
          onClick={handleRegister}
        />
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
      </form>
    </div>
  );
};
