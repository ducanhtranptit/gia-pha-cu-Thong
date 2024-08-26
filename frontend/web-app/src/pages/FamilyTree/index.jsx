import React, { useState, useEffect, useCallback, Fragment } from "react";
import PeopleAPI from "../../api/people.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap"; // Import Spinner từ react-bootstrap
import { FaUser, FaHeart } from "react-icons/fa";
import { debounce } from "lodash";
import "./style.css";

const FamilyTree = () => {
  const [familyData, setFamilyData] = useState(null);

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
      <h1 className="family-tree-page-title mt-5 my-4 ms-3">Phả đồ</h1>
      <div>
        <ToastContainer />
        {familyData ? (
          renderFamilyTree(familyData)
        ) : (
          <div className="loading-container d-flex justify-content-center text-primary">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
