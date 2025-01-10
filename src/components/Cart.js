import React from "react";
import {Link} from "react-router-dom";

const Cart = ({cart}) => {

    return(
        <div>
            <h1>{cart.Id}</h1>
            <div className='lek-details'>
                <p>NumerZamówienia: {cart.Order_NumerZamowienia}</p>
                <p>Id Leku: {cart.Lek_Id}</p>
                <p>Ilość: {cart.Ilosc}</p>
            </div>
        </div>
    )
}
export default Cart;