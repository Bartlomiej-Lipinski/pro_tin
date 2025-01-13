import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Cookies from "js-cookie";

function CartView() {
    const [cart, setCart] = useState([]);
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
            let url = `http://localhost:3001/cart/user/${user.id}?page=${currentPage}&limit=7`;
            if (user.credentials === 'ADM') {
                url = `http://localhost:3001/cart?page=${currentPage}&limit=7`;
            }
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setCart(data);
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
            <h1>Cart</h1>
            <ul>
                {cart.map(cart => (
                    <li key={cart.Order_NumerZamowienia}>
                        <Cart cart={cart} credentials={user.credentials} />
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
}

export default CartView;