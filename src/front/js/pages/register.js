import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
    const { actions } = useContext(Context);
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        const success = await actions.register(userName, email, password, navigate);
        if (!success) {
            alert("Registration failed, please try again.");
        }
    };

    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center">Register</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control my-2"
                  />
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
                  <button className="btn btn-primary" onClick={handleRegister}>
                    Register
                  </button>
    
                  {/* <AlertModal show={showAlert} handleClose={handleCloseAlert} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };