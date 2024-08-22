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
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/register"> {/* Cambiado de "/login" a "/register" */}
						<button className="btn btn-primary">Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
