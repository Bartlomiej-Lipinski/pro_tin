import React from "react";
import {Link} from "react-router-dom";

const Lek = ({lek}) => {
  return(
      <div>
          <h1>{lek.nazwa}</h1>
          <div className='lek-details'>
          <p>Cena: {lek.cena}</p>
              <button onClick={
                  () => {
                    fetch(`http://localhost:3001/lek/${lek.id}`, {
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
          <Link to={`/lek/${lek.id}`}>Więcej informacji</Link>
          </div>
      </div>
  )
}
export default Lek;