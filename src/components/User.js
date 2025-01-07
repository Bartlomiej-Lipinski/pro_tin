import React from "react";
import {useState,useEffect,} from "react";
import {Link} from "react-router-dom";

function User({user}) {
    const [loading, setLoading] = useState(true);
    return (
        <div className='lek-details'>
            <h1>{user.Email}</h1>
            <p>{user.Imie}</p>
            <p>{user.Nazwisko}</p>
            <Link to={`/user/${user.Id}`}>Więcej informacji</Link>
        </div>
    );
}
export default User;