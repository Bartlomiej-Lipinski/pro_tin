import React from "react";
import {Link} from "react-router-dom";

const Order = ({order}) => {
    return(
        <div>
            <h1>Numer Zamówienia: {order.NumerZamowienia}</h1>
            <div className='lek-details'>
                <p>Miasto: {order.Miasto}</p>
                <p>Kod Pocztowy: {order.KodPocztowy}</p>
                <Link to={`/zamowienia/${order.NumerZamowienia}`}>Więcej informacji</Link>
                <button onClick={()=>{
                    fetch(`http://localhost:3001/order/${order.NumerZamowienia}`,{
                        method: 'DELETE'
                    }).then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }}>Delete</button>
            </div>
        </div>
    )
}
export default Order;