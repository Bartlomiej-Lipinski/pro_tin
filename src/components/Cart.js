import React, {useState} from "react";

const Cart = ({cart,credentials}) => {
    const [lek, setLek] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newIlosc, setNewIlosc] = useState(cart.Ilosc);

    React.useEffect(()=>{
        fetch(`http://localhost:3001/lek/${cart.Lek_Id}`)
            .then(response => response.json())
            .then(data => {
                setLek(data);
                console.log(data);
            }).catch(error=> console.log(error));
    },[cart]);

    const handleModify = () => {
        fetch(`http://localhost:3001/cart/${cart.Order_NumerZamowienia}/${cart.Lek_Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ilosc: newIlosc
            }),
        })
            .then(response => response.json())
            .then(() => {
                console.log('Modified');
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error modifying lek:', error);
            });
        window.location.reload();
    };

    return(
        <div>
            <h1>{cart.id}</h1>
            <div className='lek-details'>
                <p>NumerZamówienia: {cart.Order_NumerZamowienia}</p>
                <p>Lek: {lek.Nazwa}</p>
                <p>Ilość: {isEditing ? (
                    <input
                        type="number"
                        value={newIlosc}
                        onChange={(e) => setNewIlosc(e.target.value)}
                    />
                ) : (
                    cart.Ilosc
                )}</p>
            </div>
            {credentials === 'ADM' && <button onClick={
                () => {
                    fetch(`http://localhost:3001/cart/${cart.Order_NumerZamowienia}/${cart.Lek_Id}`, {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(() => {
                            console.log('Deleted');
                        })
                        .catch(error => {
                            console.error('Error deleting lek:', error);
                        });
                }
            }>Usuń
            </button>}
            {isEditing ? (
                <button onClick={handleModify}>Save</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>Modify</button>
            )}
        </div>
    )
}
export default Cart;