import React from "react";
import "./style.css"; // Liên kết tới file style.css

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<h1 className="title">Trang Quản Trị Gia Phả Gia Đình Cụ Trần Văn Thông</h1>
			<br />
			<h2>Hướng dẫn sử dụng thanh menu:</h2>
			<ul className="menu-instructions">
				<li>
					<strong>Cây gia phả:</strong> Tại đây, bạn có thể xem toàn bộ phả hệ của gia đình, bao gồm các thành viên thuộc nhiều thế hệ khác nhau.
				</li>
				<li>
					<strong>Quản lý người:</strong> Cho phép bạn thêm mới, chỉnh sửa hoặc xóa thông tin của từng thành viên trong gia đình.
				</li>
				<li>
					<strong>Quản lý bài viết:</strong> Tính năng này giúp bạn kiểm duyệt, thêm mới hoặc xóa các bài đăng trên trang web.
				</li>
			</ul>

			<p>Nếu bạn cần thêm hướng dẫn hoặc gặp khó khăn, vui lòng liên hệ với bộ phận hỗ trợ: Anh Trần Đức Anh (SĐT: 0972414260)</p>
		</div>
	);
};

export default Dashboard;
