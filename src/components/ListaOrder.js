import React, { useState, useEffect } from "react";
import Order from "./Order";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/order")
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Lista zamówień</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <Order order={order} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListOrder;