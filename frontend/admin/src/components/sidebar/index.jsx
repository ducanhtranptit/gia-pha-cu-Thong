import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../api/auth";
import "./style.css";
import { removeCookie } from "../../utils/cookie";
import { ACCESSTOKEN_KEY, REFRESHTOKEN_KEY } from "../../config";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await AuthAPI.logout();
    removeCookie(ACCESSTOKEN_KEY);
    removeCookie(REFRESHTOKEN_KEY);
    navigate("/login");
  };
  return (
    <div className="side-bar">
      <h1>
        <Link to="/" className="home-link">
          Quản trị
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/family-tree">
            <p>Cây gia phả</p>
          </Link>
        </li>
        <li>
          <Link to="/manager-people">
            <p>Quản lý người</p>
          </Link>
        </li>
        <li>
          <Link to="/forms/editors">
            <p>Quản lý bài viết</p>
          </Link>
        </li>
        <li onClick={handleLogout}>
          <p>Đăng xuất</p>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
