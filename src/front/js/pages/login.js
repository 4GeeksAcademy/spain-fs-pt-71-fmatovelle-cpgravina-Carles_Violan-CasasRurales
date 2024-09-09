import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo.jpeg";

export const Login = () => {
  const { actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { success, role } = await actions.login(userName, password);

    if (success) {
      if (role === "ADMIN") {
        window.location.href = `${process.env.BACKEND_URL}/admin/`;
      } else {
        navigate("/");
      }
    } else {
      alert("Login failed, please try again.");
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
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          className="btn w-100 py-2 search-button"
          type="submit"
          onClick={handleLogin}
        >
          Sign in
        </button>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
      </form>
    </div>
  );
};
