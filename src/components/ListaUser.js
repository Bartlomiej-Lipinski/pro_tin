import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function ListaUser() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch("http://localhost:3001/user")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>User List</h1>
            {loading && <p>Loading...</p>}
            <ul>
                {data.map((user) => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ListaUser;