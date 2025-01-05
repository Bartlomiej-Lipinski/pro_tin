import React, { useState, useEffect } from "react";

function OrderDetails({ order }) {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (order && order.NumerZamowienia) {
            fetch(`http://localhost:3001/order/${order.NumerZamowienia}`)
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
    }, [order]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!orderDetails) {
        return <div>bagno</div>;
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
                <p>Numer telefonu: {orderDetails.NumerTelefonu}</p>
            </div>
        </div>
    );
}

export default OrderDetails;