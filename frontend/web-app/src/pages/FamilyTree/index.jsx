import React, { useState, useEffect, useCallback, Fragment } from "react";
import PeopleAPI from "../../api/people.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaUser, FaHeart } from "react-icons/fa";
import { debounce } from "lodash";
import { Wrapper as PopperWrapper } from "../../components/popper/index.jsx";
import UserItem from "../../components/userItem/index.jsx";
import "./style.css";
const FamilyTree = () => {
  const [familyData, setFamilyData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PeopleAPI.getAllPeopleForFamilyTree();
        setFamilyData(response.data);
      } catch (error) {
        console.error("Error fetching family data:", error);
        toast.error("Error fetching family data. Please try again later.", {
          autoClose: 10000,
        });
      }
    };

    fetchData();
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm.trim() === "") {
        setSearchResult([]);
        return;
      }
      try {
        const query = { name: searchTerm };
        const response = await PeopleAPI.getPeopleByFilter(query);
        setSearchResult(response.data);
      } catch (error) {
        console.error("Error searching:", error);
        toast.error("Error searching. Please try again later.", {
          autoClose: 10000,
        });
      }
    }, 500),
    []
  );
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };
  const renderFamilyTree = (person, level = 0) => {
    return (
      <div key={person.id} className="tree-node">
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
            {person.children.map((child) => (
              <Fragment key={child.id}>
                {renderFamilyTree(child, level + 1)}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="family-tree-container mt-5 my-4">
      <div className="search">
        <Tippy
          interactive
          visible={Array.isArray(searchResult) && searchResult.length > 0}
          render={(attrs) => (
            <div className="search-result" tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className="search-title">Thành viên</h4>
                {searchResult?.map((result, index) => (
                  <UserItem key={index} data={result} />
                ))}
              </PopperWrapper>
            </div>
          )}
          placement="bottom"
        >
          <InputGroup className="input-search">
            <Form.Control
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
        </Tippy>
      </div>
      <br></br>
      <br></br>
      <h1 className="family-tree-page-title mt-5 my-4 ms-3">Phả đồ</h1>
      <div>
        <ToastContainer />
        {familyData ? renderFamilyTree(familyData) : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default FamilyTree;
