import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useState,} from "react";
import Cookies from "js-cookie";

function RegisterForm({user}) {
    const navigate = useNavigate();
    const [imie, setImie] = useState("");
    const [nazwisko,setNazwisko] = useState("");
    const [password,setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [editingUser, setEditingUser] = useState({});
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loggedInUser = Cookies.get('user');
        if (loggedInUser) {
            setEditingUser(JSON.parse(loggedInUser));
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if(!editingUser) {
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
        }
        let newUser = {};
        newUser.Imie = imie || user.Imie;
        newUser.Nazwisko = nazwisko || user.Nazwisko;
        newUser.Password = password || user.Password;
        newUser.Email = email || user.Email;
        newUser.Credential = role || user.Credential;

        const url = user ? `http://localhost:3001/user/${user.Id}` : "http://localhost:3001/user";
        const method = user ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            if (response.status === 201 ) {
                console.log("User created/ successfully");
                navigate("/login");
            }else if(response.status === 200){
                console.log("User updated successfully");
                navigate("/user");
            } else {
                console.error("Error:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }

        console.log(imie, password, email);
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Imię</label>
                <input type="text" placeholder={user?user.Imie:"Imie"} value={imie} onChange={(e) => setImie(e.target.value)}/>
                {errors.imie && <div style={{ color: "red" }}>{errors.imie}</div>}
                <label>Nazwisko</label>
                <input type="text" placeholder={user?user.Nazwisko:"Nazwisko"} value={nazwisko} onChange={(e) => setNazwisko(e.target.value)}/>
                {errors.nazwisko && <div style={{ color: "red" }}>{errors.nazwisko}</div>}
                <label>Password</label>
                <input type={user?"text":"password"} placeholder={user?user.Password:""} value={password} onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
                <label>Email</label>
                <input type="email" placeholder={user?user.Email:"E-mail"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                {
                    editingUser.credentials ==='ADM' &&(
                        <>
                            <label>Role</label>
                            <input type="text" value={role} onChange={(e) => setRole(e.target.value)}/>
                        </>)
                }
                <button type="submit">{user?"Modify":"Register"}</button>
            </form>
            {!editingUser && <Link to="/login">Login</Link>}
        </div>
    )
}
export default RegisterForm;