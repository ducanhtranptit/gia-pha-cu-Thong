import React, { useEffect, useState } from "react";
import { adminUrl } from "../../config/url-config.js";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import { FaComments } from "react-icons/fa";
import "./style.css";
import logo from "../../public/logo.png";

const NavigationBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header>
      <Navbar expand="lg" className="navbar">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Cover" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`navbar-list${isOpen ? " open show" : ""}`}
        >
          <ul className={`navbar-list${isOpen ? " open" : ""}`}>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                Trang chủ
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/family-tree" className="navbar-link">
                Phả đồ
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/news" className="navbar-link">
                Tin tức
              </Link>
            </li>
            <li className="navbar-item">
              <a
                href={adminUrl}
                className="navbar-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quản trị
              </a>
            </li>
            <li className="chat-button">
              <a
                href="https://zalo.me/g/gqshjy512"
                className="navbar-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaComments />
              </a>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );

};

export default NavigationBar;
