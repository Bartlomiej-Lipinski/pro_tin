import React from "react";
import {Link,useNavigate} from "react-router-dom";

function User({user}) {
    const navigate = useNavigate();
    return (
        <div className='lek-details'>
            <h1>{user.Email}</h1>
            <p>{user.Imie}</p>
            <p>{user.Nazwisko}</p>
            <Link to={`/user/${user.Id}`}>Więcej informacji</Link>
            <button onClick={() => navigate(`/modify-user/${user.Id}`)}>Modify</button>
            <button onClick={
                () => {
                    fetch(`http://localhost:3001/user/${user.Id}`, {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(() => {
                            console.log('Deleted');
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error('Error deleting user:', error);
                        });
                }
            } >Delete</button>
        </div>
    );
}
export default User;