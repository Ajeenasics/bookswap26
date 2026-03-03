import React from "react";
import logo from "../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css";
import logoutlogo from "../../Assets/logout icon.png";
function AdminHomeNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin_login");
  };
  return (
    <div>
      <nav className="navbar text-white">
        <div className="container">
          <img src={logo} alt="img" width="120" height="90"></img>
          <span className="navbar-text">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link
                        to="/admin_home"
                        className="nav-link active"
                        id="navheaders"
                        aria-current="page"
                      >
                        HOME
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin_about" className="nav-link" href="#!" id="navheaders">
                        ABOUT
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/admin_viewbook"
                        className="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        BOOK
                      </Link>
                      {/* 
                      <Link
                        to="#"
                        className="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        BOOK
                      </Link> */}
                    </li>
                    <li className="nav-item">
                      <Link to="/admin_viewusers" className="nav-link" href="#!" id="navheaders">
                        USER
                      </Link>
                    </li>
                    <li className="nav-item">
                      {/* <Link to="/admin_club" className="nav-link" href="#!" id="navheaders">
                        CLUB
                      </Link> */}
                      <Link to="/admin_club" className="nav-link" href="#!" id="navheaders">
                        LIBRARY
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/admin_donation"
                        className="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        USER DONATION
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin-view-events" className="nav-link" href="#!" id="navheaders">
                        EVENTS
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin_exchange" className="nav-link" href="#!" id="navheaders">
                        EXCHANGES
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin-view-lended-list" className="nav-link" href="#!" id="navheaders">
                        LENDED LIST
                      </Link>
                    </li>

                    {/* <Link
                      to="/"
                      className="nav-link"
                      onClick={() => {
                        localStorage.removeItem("isAdminLoggedIn");
                      }}
                    >
                      <img src={logoutlogo} alt="logout" />
                    </Link> */}
                    <li className="nav-item">
                      <span className="nav-link" id="navheaders" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                        <img src={logoutlogo} alt="logout" />
                      </span>
                    </li>

                  </ul>
                </div>
              </div>
            </nav>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default AdminHomeNavbar;
