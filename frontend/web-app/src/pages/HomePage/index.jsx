import React, { useEffect, useState } from "react";
import Post from "../../components/post/index.jsx";
import PostAPI from "../../api/post.js";
// import wallpaper from "../../public/a.png";
import img from "../../public/wallpaper.png";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const Home = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPostsLatest = async () => {
			try {
				const response = await PostAPI.getPostsLatest();
				if (response.data) {
					setPosts(response.data);
				}
			} catch (error) {
				console.error("Error fetching post data:", error);
				toast.error("Error fetching post data. Please try again later.", {
					autoClose: 5000,
				});
			}
		};
		fetchPostsLatest();
	}, []);

	return (
		<div className="home">
			<div className="content mt-5">
				<Container className="my-5">
					<Row>
						<Col md={4}>
							<div>
								<img src={img} alt="Wallpaper" style={{ width: "100%" }} className="mt-5 my-4" />
							</div>
						</Col>
						<Col md={8}>
							<section className="intro">
								<h1>Gia phả gia đình cụ Trần Văn Thông</h1>
								<p>
									Cây có gốc, nước có nguồn. Người ta ai cũng phải có tổ tiên, ông bà cha mẹ thì mới có mình. Đó cũng là lẽ tất nhiên của loài người. Vì vậy, đối với tổ tiên ai cũng
									phải tôn kính, phụng thờ, phải biết ơn rõ công lao gây dựng và những ngày tiết lễ, kỵ nhật để trân trọng thờ cúng. Báo đáp công ơn thể hiện lòng hiếu kính đối với
									tổ tiên và các bậc tiền nhân đó cũng là nét đẹp văn hóa của con người.
								</p>
								<p>
									Trong xã hội công nghệ thông tin hiện nay, internet đã trở thành phổ biến, dễ sử dụng. Một số dòng họ đã gửi gia phả lên trang web Việt nam gia phả, một số lập
									trang web để lưu trữ gia phả của dòng họ mình. Vì vậy website này là mạng gia phả riêng của nhà cụ Thông để con cháu ở khắp mọi miền đất nước có thể đọc và hiểu
									biết về sự nghiệp của các đời trước cũng như quan hệ huyết thống giữa các thành viên trong họ.
								</p>
								<p>
									Website này được tạo dựng nên khởi phát từ một ý tưởng tốt đẹp, một suy nghĩ với tấm lòng biết ơn, tôn kính tổ tông của anh Trần Đức Anh, là chắt đích tôn của cụ. Ý
									tưởng ấy được sự cổ vũ, đồng tình của mọi người, với mong ước các con cháu sẽ ngày một phát triển đông đúc đóng góp được nhiều công sức, thành tích vào công cuộc
									xây dựng Tổ quốc Việt Nam thân yêu.
								</p>
							</section>
						</Col>
					</Row>
				</Container>
			</div>
			<section className="latest-posts">
				<div className="container">
					<h2>Bài đăng gần nhất</h2>
					<div className="posts-grid row g-4">
						{posts.map((post) => (
							<div key={post.id} className="post-item col-lg-4 col-md-4 col-sm-6 col-xs-1">
								<Post post={post} key={post.id} />
							</div>
						))}
					</div>
				</div>
			</section>
			<div className="w-100 py-5">
				<div className="text-center pb-4">
					<span className="fs-2">Đến nhà thờ</span>
				</div>
				<div>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3740.6385624552286!2d105.87540677523842!3d20.35654488112987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDIxJzIzLjYiTiAxMDXCsDUyJzQwLjciRQ!5e0!3m2!1svi!2s!4v1721847272366!5m2!1svi!2s"
						width="100%"
						height="450"
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title="Map"
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default Home;
