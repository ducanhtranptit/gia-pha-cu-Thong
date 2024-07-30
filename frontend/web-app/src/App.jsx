// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/index.jsx";
import News from "./pages/News/index.jsx";
import FamilyTree from "./pages/FamilyTree/index.jsx";
import PersonInfo from "./pages/PersonInfor/index.jsx";
import "./App.css";
import NewDetail from "./pages/NewDetail/index.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewDetail />} />
        <Route path="/family-tree" element={<FamilyTree />} />
        <Route path="/person-infor/:name" element={<PersonInfo />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
