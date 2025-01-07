import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";

function OrderDetails() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            fetch(`http://localhost:3001/order/${id}`)
                .then(response => response.json())
                .then(data => {
                    setOrderDetails(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Order Details</h1>
            <div className='details'>
                <p>Miasto: {orderDetails.Miasto}</p>
                <p>Kod Pocztowy: {orderDetails.KodPocztowy}</p>
                <p>Ulica: {orderDetails.Ulica}</p>
                <p>Numer domu: {orderDetails.NumerDomu}</p>
                <p>Numer mieszkania: {orderDetails.NumerMieszkania}</p>
            </div>
        </div>
    );
}

export default OrderDetails;