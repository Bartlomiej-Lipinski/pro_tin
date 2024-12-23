import React from "react";
import {Link} from "react-router-dom";

const Lek = ({lek}) => {
  return(
      <div>
          <h1>{lek.nazwa}</h1>
          <div className='lek-details'>
          <p>Cena: {lek.cena}</p>
          <Link to={`/lek/${lek.id}`}>Więcej informacji</Link>
          </div>
      </div>
  )
}
export default Lek;