import React, { useState, useEffect } from "react";
import Order from "./Order";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

    useEffect(() => {
        fetch("http://localhost:3001/order")
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <h1>Lista zamówień</h1>
            <ul>
                {currentOrders.map(order => (
                    <li key={order.id}>
                        <Order order={order}/>
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
};

export default ListOrder;