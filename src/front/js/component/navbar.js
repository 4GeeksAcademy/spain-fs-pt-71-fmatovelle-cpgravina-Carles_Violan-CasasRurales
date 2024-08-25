import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-primary">Get back Home</button>
					</Link>
				</div>
				<div className="d-flex justify-content-end">
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary me-2">Login</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/register">
						<button className="btn btn-primary">Register</button>
					</Link>
				</div>
				</div>
			</div>
		</nav>
	);
};
