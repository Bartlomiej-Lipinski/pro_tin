import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import Cart from "./Cart";

function OrderDetails() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState({});
    const [cart, setCart] = useState([]);

    useEffect(() => {
            fetch(`http://localhost:3001/order/${id}`)
                .then(response => response.json())
                .then(data => {
                    setOrderDetails(data);
                })
                .catch(error => {
                    console.log(error);
                });
    }, [id]);
    useEffect(()=>{
        fetch(`http://localhost:3001/cart/order/${id}`)
            .then(response => response.json())
            .then(data => {
                setCart(data);
            })
            .catch(error => {
                console.log(error);
            });
    },[id])

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
            <div>
            <h2>Cart</h2>
                <ul>

                    {cart.map(cart => (
                        <li key={cart.id}>
                           <Cart cart={cart} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OrderDetails;