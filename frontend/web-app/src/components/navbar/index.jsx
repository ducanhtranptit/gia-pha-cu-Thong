import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../public/logo.png";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header>
			<nav className="navbar">
				<img src={logo} alt="Cover" className="logo" />
				<button className="menu-button" onClick={toggleMenu}>
					☰
				</button>
				<ul className={`navbar-list ${isOpen ? "open" : ""}`}>
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
						<a href="http://localhost:3301" className="navbar-link" target="_blank" rel="noopener noreferrer">
							Quản trị
						</a>
					</li>
					{/* <li className="navbar-item contact-info">
						<a href="https://www.facebook.com/ducanh.tran.927/" className="navbar-link" target="_blank" rel="noopener noreferrer">
							Thông tin liên hệ
						</a>
					</li> */}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
