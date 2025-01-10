import React from "react";
import { useState } from "react";
import User from "./User";

function ListaUser() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    React.useEffect(() => {
        fetch(`http://localhost:3001/user?page=${currentPage}&limit=7`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <User user={user}/>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ListaUser;