import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function ListaOrder() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch("http://localhost:3001/order")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Order List</h1>
            {loading && <p>Loading...</p>}
            <ul>
                {data.map((order) => (
                    <li key={order.id}>
                        <Link to={`/order/${order.id}`}>{order.id}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ListaOrder;