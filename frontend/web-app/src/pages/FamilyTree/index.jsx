import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaUser, FaHeart } from "react-icons/fa";
import { debounce } from "lodash";
import config from "../../config/config.js";
import { Wrapper as PopperWrapper } from "../../components/popper/index.jsx";
import UserItem from "../../components/userItem/index.jsx";
import "./style.css";
const FamilyTree = () => {
    const baseUrl = config.baseUrl;
    const [familyData, setFamilyData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/people/family-tree`
                );
                setFamilyData(response.data.data);
            } catch (error) {
                console.error("Error fetching family data:", error);
                toast.error(
                    "Error fetching family data. Please try again later.",
                    {
                        autoClose: 10000,
                    }
                );
            }
        };

        fetchData();
    }, [baseUrl]);

    const debouncedSearch = useCallback(
        debounce(async (searchTerm) => {
            if (searchTerm.trim() === "") {
                setSearchResult([]);
                return;
            }
            try {
                const response = await axios.get(`${baseUrl}/people`, {
                    params: { name: searchTerm },
                });
                setSearchResult(response.data.data);
            } catch (error) {
                console.error("Error searching:", error);
                toast.error("Error searching. Please try again later.", {
                    autoClose: 10000,
                });
            }
        }, 500),
        [baseUrl]
    );
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        debouncedSearch(searchTerm);
    };
    const renderFamilyTree = (person, level = 0) => {
        return (
            <div key={person.name} className="tree-node">
                <button>
                    <Link to={`/person-infor/${person.name}`}>
                        <h2>
                            <FaUser /> {person.name}
                        </h2>
                        <p>
                            <FaHeart /> Vợ/chồng: {person.spouse || "Không có"}
                        </p>
                    </Link>
                </button>
                {person.children.length > 0 && (
                    <div>
                        {person.children.map((child) =>
                            renderFamilyTree(child, level + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };
    return (
        <div className="family-tree-container mt-5 my-4">
            <div className="search" style={{ position: "fixed" }}>
                <Tippy
                    interactive
                    visible={
                        Array.isArray(searchResult) && searchResult.length > 0
                    }
                    render={(attrs) => (
                        <div className="search-result" tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className="search-title">Thành viên</h4>
                                {searchResult?.map((result) => (
                                    <UserItem key={result.id} data={result} />
                                ))}
                            </PopperWrapper>
                        </div>
                    )}
                    placement="bottom"
                >
                    <InputGroup className="input-search">
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        {/* <Button variant="primary" onClick={handleSearch}>
              Tìm kiếm
            </Button> */}
                    </InputGroup>
                </Tippy>
            </div>
            <h1 className="family-tree-page-title mt-5 my-4 ms-3">
                Phả đồ dòng họ
            </h1>
            <div>
                <ToastContainer />
                {familyData ? renderFamilyTree(familyData) : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default FamilyTree;
