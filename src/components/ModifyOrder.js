import React from "react";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";

function ModifyOrder(){
    const {id} = useParams()
    const [order, setOrder] = useState({});
    const [Miasto, setMiasto] = useState("");
    const [Ulica, setUlica] = useState("");
    const [NumerDomu, setNumerDomu] = useState("");
    const [NumerMieszkania, setNumerMieszkania] = useState("");
    const [KodPocztowy, setKodPocztowy] = useState("");
    const [errors, setErrors] = useState({});


    useEffect(() => {
        fetch(`http://localhost:3001/order/${id}`)
            .then(response => response.json())
            .then(data => {
                setOrder(data);
            })
            .catch(error => {
                console.error('Error fetching lek:', error);
            });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        const modifyOrder = {
            Miasto: Miasto || order.Miasto,
            Ulica: Ulica || order.Ulica,
            NumerDomu: NumerDomu || order.NumerDomu,
            NumerMieszkania: NumerMieszkania || order.NumerMieszkania,
            KodPocztowy: KodPocztowy || order.KodPocztowy
        };
        const postalCodeRegex = /^[0-9]{2}-[0-9]{3}$/;
        if (!postalCodeRegex.test(modifyOrder.KodPocztowy)) {
            setErrors({ postalCode: "Kod pocztowy musi być zapisany w takiej formie XX-XXX" });
            return;
        }
        fetch(`http://localhost:3001/order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modifyOrder)
        }).then(response => response.json())
            .then(data => {
                if (data.message === "Order updated successfully") {
                    console.log(data);
                    window.location.href = `/zamowienia/${id}`;
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
    return (
        <div className="form-container">
            <h1>Formularz Modyfikacji zamówienia</h1>
            <form id="orderForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="City">Miasto:</label>
                    <input type="text" placeholder={order.Miasto} id="City" name="lastName" value={Miasto} onChange={(e) => setMiasto(e.target.value)}  />
                </div>
                <div className="form-group">
                    <label htmlFor="street">Ulica:</label>
                    <input type="text" placeholder={order.Ulica} id="street" name="ulica" value={Ulica} onChange={(e) => setUlica(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="houseNumber">Numer domu:</label>
                    <input type="number" placeholder={order.NumerDomu} id="houseNumber" name="numerDomu" value={NumerDomu} onChange={(e) => setNumerDomu(e.target.value)}  />
                </div>
                <div className="form-group">
                    <label htmlFor="flatNumber">Numer Mieszkania: (opcjonalne)</label>
                    <input type="number" placeholder={order.NumerMieszkania} id="flatNumber" name="numerMieszkania" value={NumerMieszkania} onChange={(e) => setNumerMieszkania(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Kod pocztowy:</label>
                    <input type="text" placeholder={order.KodPocztowy} id="postalCode" name="postalCode" value={KodPocztowy} onChange={(e) => setKodPocztowy(e.target.value)} />
                    {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                </div>
                <button type="submit" className="submit-button">Modify</button>
            </form>
        </div>
    );
}
export default ModifyOrder;