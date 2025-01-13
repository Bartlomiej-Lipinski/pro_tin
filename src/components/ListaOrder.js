import React, { useState, useEffect } from "react";
import Order from "./Order";
import Cookies from "js-cookie";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState({});

    useEffect(() => {
        const loggedInUser = Cookies.get('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    useEffect(() => {
        if (user && user.id) {
            let url = `http://localhost:3001/order/user/${user.id}?page=${currentPage}&limit=3`;
            if (user.credentials === 'ADM') {
                url = `http://localhost:3001/order?page=${currentPage}&limit=3`;
            }
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setOrders(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [currentPage, user]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <h1>Lista zamówień</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <Order order={order}/>
                    </li>
                ))}
            </ul>
            <h2>Strona: {currentPage}</h2>
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
};

export default ListOrder;