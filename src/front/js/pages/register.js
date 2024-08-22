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
            <h2>Register</h2>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleRegister} className="btn btn-primary">Register</button>
        </div>
    );
};
