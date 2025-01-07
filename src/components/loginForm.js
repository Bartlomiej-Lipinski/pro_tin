import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    React.useEffect(() => {
        fetch("http://localhost:3001/user")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = {};
        users.map(user => {
            if (user.Email === email && user.Password === password) {
                 userData = { id:user.Id, firstName: user.Imie, lastName: user.Nazwisko , email: user.Email};
                Cookies.set('user', JSON.stringify(userData));
                navigate("/");
                window.location.reload();
                console.log("Logged in successfully");
            }else {
                console.log("Invalid email or password");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;