import React,{useState} from "react";

const Form = () => {
    const [City, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [flatNumber, setFlatNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!City) newErrors.lastName = "Last name is required";
        if (!street) newErrors.street = "Street is required";
        if (!houseNumber) newErrors.houseNumber = "House number is required";
        if (!postalCode) newErrors.postalCode = "Postal code is required";
        return newErrors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const newOrder={
            City,
            street,
            houseNumber,
            flatNumber,
            postalCode
        }
        setLoading(true);
        fetch("http://localhost:3001/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({newOrder})
        }).then((res)=>{
            res.status === 200 ? console.log("Utworzono zamówienie") : console.log("Błąd tworzenia zamówienia");
        }).then(() => {
            setLoading(false);
        }).catch(error => console.log(error));
    }
    return (
        <div className="form-container">
            <h1>Formularz zamówienia</h1>
            <form id="orderForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="City">Miasto:</label>
                    <input type="text" id="City" name="lastName" value={City} onChange={(e) => setCity(e.target.value)} required />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="street">Ulica:</label>
                    <input type="text" id="street" name="ulica" value={street} onChange={(e) => setStreet(e.target.value)} required />
                    {errors.street && <p className="error">{errors.street}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="houseNumber">Numer domu:</label>
                    <input type="text" id="houseNumber" name="numerDomu" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} required />
                    {errors.houseNumber && <p className="error">{errors.houseNumber}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="flatNumber">Numer Mieszkania: (opcjonalne)</label>
                    <input type="number" id="flatNumber" name="numerMieszkania" value={flatNumber} onChange={(e) => setFlatNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Kod pocztowy:</label>
                    <input type="text" id="postalCode" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                </div>
                <button type="submit" className="submit-button" disabled={loading}>Zamów</button>
            </form>
        </div>
    );
};

export default Form;