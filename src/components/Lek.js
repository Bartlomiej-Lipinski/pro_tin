import React from "react";
import {Link} from "react-router-dom";

const Lek = ({lek,addToCart}) => {
  return(
      <div>
          <h1>{lek.Nazwa}</h1>
          <div className='lek-details'>
          <p>Cena: {lek.Cena}</p>
          <Link to={`/lek/${lek.id}`}>Więcej informacji</Link>
              <button onClick={addToCart}>Add to cart</button>
          </div>
      </div>
  )
}
export default Lek;