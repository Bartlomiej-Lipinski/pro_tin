import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import Cart from "./Cart";
function CartView(){
    const [leki, setLeki] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3001/cart?page=${currentPage}&limit=7`)
        .then(response => response.json())
        .then(data => {
            setCart(data)
        }).catch(error=> console.log(error));
    }, []);
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
                        <Cart key={cart.Order_NumerZamowienia} cart={cart}/>
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