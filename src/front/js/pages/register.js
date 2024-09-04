import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo.jpeg";

export const Register = () => {
  const { actions } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the form from submitting
    // Validate that the email contains an '@' symbol
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    
    const success = await actions.register(userName, email, password, navigate);
    if (!success) {
      alert("Registration failed, please try again.");
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
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <div className="form-floating">
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
        <button className="btn w-100 py-2 user-button" type="submit"  onClick={handleRegister}>
          Sign up
        </button>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
      </form>
    </div>
  );
};
