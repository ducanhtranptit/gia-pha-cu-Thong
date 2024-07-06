import React, { useState, useEffect, useMemo } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import PeopleAPI from "../../api/people.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import EditPersonModal from "./EditInfoPersonModal/index.jsx";
import CreatePersonModal from "./CreatePersonModal/index.jsx";
import _ from "lodash";

function ManagerPeople() {
    const [getPeople, setGetPeople] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [currentPerson, setCurrentPerson] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    const fetchData = async (name = "") => {
        setLoading(true);
        try {
            const response = await PeopleAPI.getAllPeople({ name });
            setGetPeople(response.data);
        } catch (error) {
            console.error("Error fetching family data:", error);
            toast.error("Error fetching family data. Please try again later.", {
                autoClose: 10000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const debouncedFetchData = useMemo(
        () =>
            _.debounce((value) => {
                fetchData(value);
            }, 300),
        []
    );

    const handleEditClick = (person) => {
        setCurrentPerson(person);
        setShowEditForm(true);
    };

    const handleSaveEdit = async (updatedPerson) => {
        try {
            await PeopleAPI.updatePerson(updatedPerson);
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

    const handleDeleteClick = async (personId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người này không?")) {
            try {
                await PeopleAPI.deletePerson(personId);
                const updatedPeople = getPeople.filter(
                    (person) => person.id !== personId
                );
                setGetPeople(updatedPeople);
                toast.success("Người dùng đã được xóa!");

                const totalPagesAfterDeletion = Math.ceil(
                    updatedPeople.length / itemsPerPage
                );

                if (currentPage > totalPagesAfterDeletion) {
                    setCurrentPage(totalPagesAfterDeletion);
                }
                fetchData();
            } catch (error) {
                console.error("Error deleting person:", error);
                toast.error("Error deleting person. Please try again later.");
            }
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedFetchData(value);
    };

    const paginatedPeople = getPeople.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(getPeople.length / itemsPerPage);

    const renderTableBody = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan="5">Loading...</td>
                </tr>
            );
        } else if (getPeople.length === 0) {
            return (
                <tr>
                    <td colSpan="5">No data</td>
                </tr>
            );
        } else {
            return paginatedPeople.map((people) => (
                <tr key={people.id}>
                    <td>{people.id}</td>
                    <td>{people.name}</td>
                    <td>{people.gender === "male" ? "Nam" : "Nữ"}</td>
                    <td>
                        <Button
                            variant="primary"
                            onClick={() => handleEditClick(people)}
                        >
                            Sửa
                        </Button>
                    </td>
                    <td>
                        <Button
                            variant="danger"
                            onClick={() => handleDeleteClick(people.id)}
                        >
                            Xóa
                        </Button>
                    </td>
                </tr>
            ));
        }
    };

    return (
        <div className="wrapper">
            <div className="title">
                <h2>Quản lý thành viên</h2>
            </div>
            <div className="controls">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="add-person">
                    <Button
                        variant="success"
                        onClick={() => setShowCreateForm(true)}
                    >
                        Thêm mới
                    </Button>
                </div>
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
                    <tbody>{renderTableBody()}</tbody>
                </Table>
            </div>
            {currentPerson && (
                <EditPersonModal
                    show={showEditForm}
                    handleClose={() => setShowEditForm(false)}
                    person={currentPerson}
                    handleSave={handleSaveEdit}
                    fetchData={fetchData}
                />
            )}
            <CreatePersonModal
                show={showCreateForm}
                fetchData={fetchData}
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
