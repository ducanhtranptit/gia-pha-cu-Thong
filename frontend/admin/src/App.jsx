import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/sidebar";
import FamilyTree from "./pages/FamilyTree";
import Dashboard from "./pages/Dashboard";
import ManagerPeople from "./pages/ManagerPeople";
import ManagerPosts from "./pages/ManagerPosts";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="family-tree" element={<FamilyTree />} />
          <Route path="manager-people" element={<ManagerPeople />} />
          <Route path="forms/editors" element={<ManagerPosts />} />
        </Route>
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
