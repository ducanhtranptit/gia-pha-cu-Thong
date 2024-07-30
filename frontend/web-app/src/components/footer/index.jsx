import React from "react";
import logo from "../../public/logo.png";
import "./style.css";

const Footer = () => (
	<footer className="footer col-12">
		<div className="row">
			<div className="col-6 text-center">
				<section style={{ textAlign: "justify", paddingLeft: "30px", marginLeft: "10%" }}>
					<p>GIA ĐÌNH CỤ THÔNG</p>
					<p>Địa chỉ: Xã Gia Vân, huyện Gia Viễn, tỉnh Ninh Bình</p>
					<p>Quản Trị website: Trần Hồng Phú - SĐT: 0386677899</p>
				</section>
			</div>
			<div className="col-3">
				<div className="row">
					<div className="col-6 logo-container">
						<img src={logo} alt="Logo" className="footer-logo" />
					</div>
				</div>
			</div>
		</div>
		<hr style={{ width: "100%", margin: "20px 0", border: "1px solid white" }} />
		<p>Copyright@2024 by TranDucAnh</p>
	</footer>
);

export default Footer;
