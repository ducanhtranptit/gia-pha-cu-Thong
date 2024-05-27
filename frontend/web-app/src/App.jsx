// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/index.jsx";
import News from "./pages/News/index.jsx";
import Navbar from "./components/navbar/index.jsx";
import FamilyTree from "./pages/FamilyTree/index.jsx";
import PersonInfo from "./pages/PersonInfor/index.jsx";
import "./App.css";

const App = () => (
  <Router>
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/family-tree" element={<FamilyTree />} />
          <Route path="/person-infor/:name" element={<PersonInfo />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
