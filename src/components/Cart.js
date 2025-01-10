import React from "react";
import {Link} from "react-router-dom";

const Cart = ({cart}) => {
    const [lek, setLek] = React.useState({});
    React.useEffect(()=>{
        fetch(`http://localhost:3001/lek/${cart.Lek_Id}`)
            .then(response => response.json())
            .then(data => {
                setLek(data);
                console.log(data);
            }).catch(error=> console.log(error));
    },[cart]);

    return(
        <div>
            <h1>{cart.Id}</h1>
            <div className='lek-details'>
                <p>NumerZamówienia: {cart.Order_NumerZamowienia}</p>
                <p>Lek: {lek.Nazwa}</p>
                <p>Ilość: {cart.Ilosc}</p>
            </div>
        </div>
    )
}
export default Cart;