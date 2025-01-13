import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";

const Form = () => {
    const [Miasto, setMiasto] = useState("");
    const [Ulica, setUlica] = useState("");
    const [NumerDomu, setNumerDomu] = useState("");
    const [NumerMieszkania, setNumerMieszkania] = useState("");
    const [KodPocztowy, setKodPocztowy] = useState("");
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [cartMap, setCartMap] = useState(new Map());
    const userId = user.id;
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!Miasto) newErrors.lastName = "Last name is required";
        if (!Ulica) newErrors.street = "Street is required";
        if (!NumerDomu) newErrors.houseNumber = "House number is required";
        if (!KodPocztowy) newErrors.postalCode = "Postal code is required";
        return newErrors;
    };

    useEffect(() => {
        const loggedInUser = Cookies.get('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    useEffect(() => {
        const loggedInUser = Cookies.get('cart');
        if (loggedInUser) {
            setCart(JSON.parse(loggedInUser));
        }
    }, []);

    const countCartItems = (cart) => {
        const map = new Map();
        cart.forEach((item) => {
            map.set(item, map.get(item) + 1 || 1);
        });
        setCartMap(map);
    };
    function submitCart(orderid, lekId, ilosc){
        let cartToCommit = {orderid,lekId,ilosc};
        fetch("http://localhost:3001/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartToCommit)
        }).then((res)=>{
            res.status === 200 ? console.log("Utworzono zamówienie") : console.log("Błąd tworzenia zamówienia");
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let orderid = 0;
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const newOrder = {
            Miasto,
            Ulica,
            NumerDomu,
            NumerMieszkania,
            KodPocztowy,
            userId
        };
        fetch("http://localhost:3001/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newOrder)
        })
            .then((res) => res.json())
            .then((data) => {
                orderid = data.id;
                countCartItems(cart);
                if (orderid !== 0 || orderid !== undefined) {
                    cartMap.forEach((value, key) => {
                        submitCart(orderid, key, value);
                    });
                    Cookies.remove('cart');
                }
            })
            .catch(error => console.log(error));
    };
    return (
        <div className="form-container">
            <h1>Formularz zamówienia</h1>
            <form id="orderForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="City">Miasto:</label>
                    <input type="text" id="City" name="lastName" value={Miasto} onChange={(e) => setMiasto(e.target.value)} required />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="street">Ulica:</label>
                    <input type="text" id="street" name="ulica" value={Ulica} onChange={(e) => setUlica(e.target.value)} required />
                    {errors.street && <p className="error">{errors.street}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="houseNumber">Numer domu:</label>
                    <input type="number" id="houseNumber" name="numerDomu" value={NumerDomu} onChange={(e) => setNumerDomu(e.target.value)} required />
                    {errors.houseNumber && <p className="error">{errors.houseNumber}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="flatNumber">Numer Mieszkania: (opcjonalne)</label>
                    <input type="number" id="flatNumber" name="numerMieszkania" value={NumerMieszkania} onChange={(e) => setNumerMieszkania(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Kod pocztowy:</label>
                    <input type="text" id="postalCode" name="postalCode" value={KodPocztowy} onChange={(e) => setKodPocztowy(e.target.value)} required />
                    {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                </div>
                <button type="submit" className="submit-button">Zamów</button>
            </form>
        </div>
    );
};

export default Form;