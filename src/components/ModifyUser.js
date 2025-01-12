import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import RegisterForm from "./RegisterForm";

function ModifyUser() {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/user/${id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.error('Error fetching lek:', error);
            });
    }, [id]);
  return (
    <div>
      <RegisterForm user={user} />
    </div>
  );
}
export default ModifyUser;