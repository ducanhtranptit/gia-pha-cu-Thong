import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar";
import FamilyTree from "./pages/FamilyTree";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Router>
			<div className="d-flex col-12">
				<div className="col-2"></div>
				<SideBar />
				<div className="content col-8">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/family-tree" element={<FamilyTree />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
