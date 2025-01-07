import React from "react";
import {Link} from "react-router-dom";

const Lek = ({lek,addToCart,user}) => {

  return(
      <div>
          <h1>{lek.Nazwa}</h1>
          <div className='lek-details'>
          <p>Cena: {lek.Cena}</p>
          <Link to={`/lek/${lek.Id}`}>Więcej informacji</Link>
              {user &&  <button onClick={addToCart}>Add to cart</button>}
          </div>
      </div>
  )
}
export default Lek;