import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`navbar navbar-expand-lg bg-white fixed-top ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
            FC
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 text-center">
              {[
                { name: "Home", path: "/" },
                { name: "Menu", path: "/menu" },
                { name: "Mobile App", path: "/mobile-app" },
                { name: "Contact", path: "/contact-us" },
              ].map((item) => (
                <li className="nav-item" key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link fw-medium ${
                        isActive ? "text-primary border-bottom border-2" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right Section */}
            <div className="d-flex justify-content-center align-items-center gap-3 mt-3 mt-lg-0">
              {/* Search */}
              <button
                className="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="bi bi-search"></i>
              </button>

              {/* Cart */}
              <div className="position-relative">
                <Link to="/cart" className="btn btn-light">
                  <i className="bi bi-cart3"></i>
                </Link>
                {getTotalCartAmount() > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    !
                  </span>
                )}
              </div>

              {/* Auth */}
              {!token ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowLogin(true)}
                >
                  Sign In
                </button>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle fs-5"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/myorders")}
                      >
                        <i className="bi bi-bag me-2"></i>Orders
                      </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* SEARCH MODAL */}
      <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Search</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Search food, items..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* navbar spacing fix */}
      <div style={{ height: "70px" }}></div>
    </>
  );
};

export default Navbar;
