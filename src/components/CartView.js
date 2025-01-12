import React, {use} from "react";
import {useState,useEffect} from "react";
import Cart from "./Cart";
import Cookies from "js-cookie";
function CartView(){

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
        let url = `http://localhost:3001/cart/user/${user.id}?page=${currentPage}&limit=7`;
        if (user && user.Credentials === 'ADM') {
            url=`http://localhost:3001/cart?page=${currentPage}&limit=7`
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCart(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [currentPage, user]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return(
        <div>
            <h1>Cart</h1>
            <ul>
                {cart.map(cart => (
                    <li>
                        <Cart key={cart.Order_NumerZamowienia} cart={cart} credentials={user.Credentials}/>
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
    )
}

export default CartView;