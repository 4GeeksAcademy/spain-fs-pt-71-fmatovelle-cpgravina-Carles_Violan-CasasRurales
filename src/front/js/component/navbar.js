import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo_test.png";
import "../../styles/home.css";


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Use useNavigate for redirection
  // const [destination, setDestination] = useState("");
  // const [checkin, setCheckin] = useState("");
  // const [checkout, setcheckout] = useState("");

  useEffect(() => {
    actions.getCurrentUser();
  }, []);

  const handleLogout = async () => {
    await actions.logout(navigate); // Pass navigate to the logout function
  };

//   const success = await actions.login(destination, checkin, checkout, guests, navigate);
//   if (!success) {
//     alert("Login failed, please try again.");
//   }
// };

  const handleLogin = async () => {
    const success = await actions.login(userName, email, password, navigate);
    if (!success) {
      alert("Login failed, please try again.");
    }
  };

  return (
    <header>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div>
          <Link className="navbar-brand d-flex" to="/">
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-text-top"
              style={{ width: 'auto', height: '50px'}}
            />
            <span className="brand-name ms-2 fs-1 w-bold">Rural Experience</span>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarToggler"
          style={{ width: '50px', height: 'auto'}}
        >
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn m-1 globe-button"
              data-bs-toggle="modal"
              data-bs-target="#createNewPostModal"
              style={{ width: '50px', height: '50px'}}
              
            >
              <i className="fa-solid fa-globe"></i>
            </button>
            <div className="dropdown m-1">
              <button
                style={{ width: 'auto', height: '50px'}}
                className="btn dropdown-toggle user-button"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-regular fa-user"></i>
              </button>
              <ul className="dropdown-menu fs-6 dropdown-menu-end">
                {store.currentUser ? (
                  <>
                    <p className="dropdown-item">Welcome, {store.currentUser.userName}</p>
                    <li>
                      <Link className="dropdown-item" to="/traveler/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Favorites
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item my-2" to="#">
                        Privacy and Data
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item border-top border-danger"
                        to="#"
                        onClick={handleLogout} // Call handleLogout on click
                      >
                        Log out
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/register">
                      Register
                    </Link>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div className="fs-1 text-body-secondary mx-auto my-5" style={{ width: '50rem', height: 'auto'}}>
    <form className="container d-flex align-items-center text-body-secondary m-auto p-0" role="search">
        <input
          className="form-control fs-5 text-body-secondary me-2"
          type="search"
          placeholder="Destination"
          aria-label="Destination"
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          className="form-control fs-5 text-body-secondary me-2"
          type="date"
          placeholder="Check-in"
          aria-label="Check-in"
          onChange={(e) => setCheckin(e.target.value)}
        />
        <input
          className="form-control fs-5 text-body-secondary me-2"
          type="date"
          placeholder="Check-out"
          aria-label="Check-out"
          onChange={(e) => setCheckout(e.target.value)}
        />
        <select className="form-control fs-5 text-body-secondary me-2" aria-label="Guests">
          <option value="" disabled selected>
            Guests
          </option>
          <option value="1">Adults</option>
          <option value="2">Children</option>
          <option value="3">Bedrooms</option>
          <option value="4">Bathrooms</option>
          <option value="4">Animals allowed</option>
          {/* Add more options as needed */}
        </select>
        
        <button className="btn search-button navbar-btn" type="submit">
          <i className="fa-solid fa-magnifying-glass text-body-secondary"></i>
        </button>
    </form>
</div>
    </header>
    
  );
};
