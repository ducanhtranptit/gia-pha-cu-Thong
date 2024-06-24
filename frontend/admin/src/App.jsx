import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar";
import FamilyTree from "./pages/FamilyTree";
import Dashboard from "./pages/Dashboard";
import ManagerPeople from "./pages/ManagerPeople";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Router>
            <div className="d-flex col-12">
                <div className="col-2">
                    <SideBar />
                </div>
                <div className="content col-10">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/family-tree" element={<FamilyTree />} />
                        <Route
                            path="/manager-people"
                            element={<ManagerPeople />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
