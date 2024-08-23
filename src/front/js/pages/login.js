import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();

 


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">

              <h2 className="card-title text-center">Login / CreateUser</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control my-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control my-2"
      />
      <button className="btn btn-primary" onClick="">Login</button>

              <h2 className="card-title text-center">Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control my-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control my-2"
              />
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>


              {/* <AlertModal show={showAlert} handleClose={handleCloseAlert} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
