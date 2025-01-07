import React from "react";
import { useState } from "react";
import User from "./User";

function ListaUser() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 7;

    React.useEffect(() => {
        fetch("http://localhost:3001/user")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
    }, []);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastUser = currentPage * ordersPerPage;
    const indexOfFirstUser = indexOfLastUser - ordersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {currentUsers.map(user => (
                    <li key={user.id}>
                        <User user={user}/>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ListaUser;