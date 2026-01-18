import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [analyticsMenuOpen, setAnalyticsMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action d-flex align-items-center gap-3 border-0 rounded-3 mb-1 ${
      isActive ? "active fw-semibold bg-primary text-white" : "text-dark"
    }`;

  return (
    <div
      className="d-flex flex-column p-3 bg-white shadow-sm"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      {/* Logo / Title */}
      <h4 className="fw-bold text-primary mb-4">
        <i className="bi bi-speedometer2 me-2"></i>Admin
      </h4>

      {/* Menu */}
      <div className="list-group list-group-flush">

        {/* Dashboard */}
        <NavLink to="/" className={linkClass} end>
          <i className="bi bi-grid fs-5"></i>
          Dashboard
        </NavLink>

        {/* Products / Items submenu */}
        <button
          className="list-group-item list-group-item-action d-flex align-items-center gap-3 border-0 rounded-3 mb-1 text-dark"
          onClick={() => setProductMenuOpen(!productMenuOpen)}
        >
          <i className="bi bi-box-seam fs-5"></i>
          Products
          <i className={`bi ms-auto fs-6 ${productMenuOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>
        {productMenuOpen && (
          <div className="ms-4">
            <NavLink to="/add" className={linkClass}>
              <i className="bi bi-plus-square fs-5"></i>
              Add Item
            </NavLink>
            <NavLink to="/list" className={linkClass}>
              <i className="bi bi-card-list fs-5"></i>
              List Items
            </NavLink>
          </div>
        )}

        {/* Orders */}
        <NavLink to="/orders" className={linkClass}>
          <i className="bi bi-bag-check fs-5"></i>
          Orders
        </NavLink>

        {/* Analytics submenu */}
        <button
          className="list-group-item list-group-item-action d-flex align-items-center gap-3 border-0 rounded-3 mb-1 text-dark"
          onClick={() => setAnalyticsMenuOpen(!analyticsMenuOpen)}
        >
          <i className="bi bi-bar-chart-line fs-5"></i>
          Analytics
          <i className={`bi ms-auto fs-6 ${analyticsMenuOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
        </button>
        {analyticsMenuOpen && (
          <div className="ms-4">
            <NavLink to="/analytics/revenue" className={linkClass}>
              <i className="bi bi-currency-dollar fs-5"></i>
              Revenue
            </NavLink>
            <NavLink to="/analytics/top-items" className={linkClass}>
              <i className="bi bi-star fs-5"></i>
              Top Items
            </NavLink>
            <NavLink to="/analytics/status" className={linkClass}>
              <i className="bi bi-pie-chart fs-5"></i>
              Order Status
            </NavLink>
          </div>
        )}

        {/* Users */}
        <NavLink to="/users" className={linkClass}>
          <i className="bi bi-people fs-5"></i>
          Users
        </NavLink>

        {/* Categories */}
        <NavLink to="/categories" className={linkClass}>
          <i className="bi bi-tags fs-5"></i>
          Categories
        </NavLink>

        {/* Settings */}
        <NavLink to="/settings" className={linkClass}>
          <i className="bi bi-gear fs-5"></i>
          Settings
        </NavLink>

        {/* Logout */}
        <NavLink to="/logout" className={linkClass}>
          <i className="bi bi-box-arrow-right fs-5"></i>
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
