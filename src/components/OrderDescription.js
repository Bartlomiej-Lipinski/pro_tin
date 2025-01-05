import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function OrderDescription({ match }) {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch(`http://localhost:3001/order/${match.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setOrder(data);
                setLoading(false);
            });
    }, [match.params.id]);

    return (
        <div>
            <h1>Order Description</h1>
            {loading && <p>Loading...</p>}
            <ul>
                <li>Order ID: {order.id}</li>
                <li>Order Date: {order.date}</li>
                <li>Order Status: {order.status}</li>
                <li>Order Total: {order.total}</li>
            </ul>
        </div>
    );
}
export default OrderDescription;