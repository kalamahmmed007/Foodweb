import React, { useState } from "react";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          {/* FC Logo Text */}
          <span className="fw-bold text-primary fs-4">FC</span>
        </a>

        {/* Right items */}
        <div className="d-flex align-items-center ms-auto gap-3">
          {/* Search Icon */}
          <button className="btn btn-light rounded-circle">
            <i className="bi bi-search fs-5"></i>
          </button>

          {/* Profile */}
          <div className="dropdown">
            <img
              src="https://via.placeholder.com/40" // placeholder profile image
              alt="Profile"
              className="rounded-circle"
              style={{ width: "40px", cursor: "pointer" }}
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <ul className="dropdown-menu dropdown-menu-end show mt-2 shadow">
                <li>
                  <a className="dropdown-item d-flex align-items-center gap-2" href="/profile">
                    <i className="bi bi-person"></i> Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center gap-2" href="/settings">
                    <i className="bi bi-gear"></i> Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center gap-2 text-danger" href="/logout">
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
