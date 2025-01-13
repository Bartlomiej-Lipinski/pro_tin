import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = {};
        let emailReg = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");
        let tempEmail = emailReg.test(email);
        if (!tempEmail){
            setError("Email niepoprawny");
            return;
        }
        userData={email:email,password:password};
        fetch('http://localhost:3001/userLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response =>{
                if (response.status === 404){
                    setError("Email lub haslo niepoprawne")
                    return null;
                }
                return response.json()
            })
            .then(data => {
                setUser(data)
                const loggedInUser = {
                    id: data.Id,
                    firstName: data.Imie,
                    lastName: data.Nazwisko,
                    email: data.Email,
                    credentials: data.Credential
                };
                Cookies.set('user', JSON.stringify(loggedInUser));
                navigate("/");
                window.location.reload();
                console.log("Logged in successfully");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginForm;