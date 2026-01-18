import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">
        <div className="row gy-4">

          {/* Left */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3">FC</h4>
            <p className="text-secondary">
              Building modern web solutions with clean UI, scalable backend
              and smooth user experience.
            </p>
            <div className="d-flex gap-3 fs-5">
              <i className="bi bi-facebook cursor-pointer"></i>
              <i className="bi bi-twitter cursor-pointer"></i>
              <i className="bi bi-linkedin cursor-pointer"></i>
              <i className="bi bi-github cursor-pointer"></i>
            </div>
          </div>

          {/* Center */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3">Company</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">Home</li>
              <li className="mb-2">About</li>
              <li className="mb-2">Services</li>
              <li className="mb-2">Privacy Policy</li>
            </ul>
          </div>

          {/* Right */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3">Get in Touch</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +880 1234 567890
              </li>
              <li>
                <i className="bi bi-envelope me-2"></i>
                demo@gmail.com
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <p className="text-center text-secondary mb-0 pb-3">
          © 2026 FC — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
