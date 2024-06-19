import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config/url-config.js";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import EditPersonForm from "../EditInfoPerson";
import CreatePersonForm from "../CreateFormPerson";

function ManagerPeople() {
    const baseUrl = config.baseUrl;
    const [getPeople, setGetPeople] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentPerson, setCurrentPerson] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Số mục trên mỗi trang mặc định

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/people/get-all-people`
                );
                setGetPeople(response.data.data);
                console.log("people:", getPeople.children);
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

    const handleEditClick = (person) => {
        setCurrentPerson(person);
        setShowEditForm(true);
    };

    const handleSaveEdit = async (updatedPerson) => {
        try {
            await axios.put(
                `${baseUrl}/people/${updatedPerson.id}`,
                updatedPerson
            );
            setGetPeople((prevPeople) =>
                prevPeople.map((person) =>
                    person.id === updatedPerson.id ? updatedPerson : person
                )
            );
            toast.success("Thông tin người dùng đã được cập nhật!");
        } catch (error) {
            console.error("Error updating person data:", error);
            toast.error("Error updating person data. Please try again later.");
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedPeople = getPeople.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(getPeople.length / itemsPerPage);

    return (
        <div className="wrapper">
            <div className="title">
                <h2>Quản lý thành viên</h2>
            </div>
            <div className="add-person">
                <Button
                    variant="success"
                    onClick={() => setShowCreateForm(true)}
                >
                    Thêm mới
                </Button>
            </div>
            <div className="table-people">
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Giới tính</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPeople.map((people) => (
                            <tr key={people.id}>
                                <td>{people.id}</td>
                                <td>{people.name}</td>
                                <td>
                                    {people.gender === "male" ? "Nam" : "Nữ"}
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEditClick(people)}
                                    >
                                        Sửa
                                    </Button>
                                </td>
                                <td>Xóa</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {currentPerson && (
                <EditPersonForm
                    show={showEditForm}
                    handleClose={() => setShowEditForm(false)}
                    person={currentPerson}
                    handleSave={handleSaveEdit}
                />
            )}
            <CreatePersonForm
                show={showCreateForm}
                handleClose={() => setShowCreateForm(false)}
            />
            <ToastContainer />
            <div className="pagination-controls">
                <div className="pagination-buttons">
                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <Button
                            key={page}
                            variant="outline-primary"
                            onClick={() => handlePageChange(page)}
                            active={page === currentPage}
                            style={{ margin: "0 5px" }}
                        >
                            {page}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManagerPeople;
