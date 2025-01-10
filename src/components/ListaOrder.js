import React, { useState, useEffect } from "react";
import Order from "./Order";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("http://localhost:3001/order?page=${currentPage}&limit=7")
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.log(error);
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
            <h1>Lista zamówień</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <Order order={order}/>
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
};

export default ListOrder;