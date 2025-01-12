import React from "react";
import {Link,useNavigate} from "react-router-dom";

const Lek = ({lek}) => {
    const navigate = useNavigate();
  return(
      <div>
          <h1>{lek.Nazwa}</h1>
          <div className='lek-details'>
          <p>Cena: {lek.Cena}</p>
          <Link to={`/lek/${lek.Id}`}>Więcej informacji</Link>
              <button onClick={
                  () => {
                    fetch(`http://localhost:3001/lek/${lek.Id}`, {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(() => {
                            console.log('Deleted');
                        })
                        .catch(error => {
                            console.error('Error deleting lek:', error);
                        });
              }
              }>Usuń</button>
              <button onClick={() => navigate(`/modify-lek/${lek.Id}`)}>Modify</button>
          </div>
      </div>
  )
}
export default Lek;