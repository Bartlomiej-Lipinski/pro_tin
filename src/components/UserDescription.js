import React from "react";
import {Link, useParams} from "react-router-dom";
import { useState } from "react";

function UserDescription() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch("http://localhost:3001/user/${id}")
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
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
export default UserDescription;