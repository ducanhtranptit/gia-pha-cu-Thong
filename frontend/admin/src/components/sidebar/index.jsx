import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const SideBar = () => {
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
            </ul>
        </div>
    );
};

export default SideBar;
