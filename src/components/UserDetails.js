import React from "react";
import {useState,useEffect,} from "react";
import {useParams} from "react-router-dom";

function UserDetails() {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            fetch(`http://localhost:3001/user/${id}`)
                .then(response => response.json())
                .then(data => {
                    setUserDetails(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id]);

    return(
        <div>
            <h1>User Details</h1>
            <div className='details'>
                {/*<p>Imię: {userDetails.Imie}</p>*/}
                {/*<p>Nazwisko: {userDetails.Nazwisko}</p>*/}
                {/*<p>Email: {userDetails.Email}</p>*/}
            </div>
        </div>
    );
}
export default UserDetails;