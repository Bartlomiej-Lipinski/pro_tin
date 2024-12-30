import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";

function RegisterForm() {
    const [imie, setImie] = useState("");
    const [nazwisko,setNazwisko] = useState("");
    const [password,setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};


        if (!imie) newErrors.imie = "Imię jest wymagane";
        if (!nazwisko) newErrors.nazwisko = "Nazwisko jest wymagane";
        if (!password) newErrors.password = "Hasło jest wymagane";
        if (!email) {
            newErrors.email = "Email jest wymagany";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email jest nieprawidłowy";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log(imie, nazwisko, password, email);
            setErrors({});
        }
        console.log(imie, password, email);
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Imię</label>
                <input type="text" value={imie} onChange={(e) => setImie(e.target.value)}/>
                {errors.imie && <div style={{ color: "red" }}>{errors.imie}</div>}
                <label>Nazwisko</label>
                <input type="text" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)}/>
                {errors.nazwisko && <div style={{ color: "red" }}>{errors.nazwisko}</div>}
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    )
}
export default RegisterForm;