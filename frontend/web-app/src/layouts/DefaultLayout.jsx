import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navbar";
import Footer from "../components/footer";

function DefaultLayout() {
	return (
		<div className="app">
			<NavigationBar />
			<div className="content">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default DefaultLayout;
