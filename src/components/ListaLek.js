import React,{useState, useEffect} from "react";
import Lek from "./Lek";
import cartImg from "./shopping-cart.png";
const List = () => {
    const [leki, setLeki] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    const addToCart = (lek) => {
        setCart([...cart, lek.id]);
    };

    useEffect(() => {
        fetch("http://localhost:3001/lek")
        .then(response => response.json())
        .then(data => {
            setLeki(data)
            setLoading(false);
        }).catch(error=> console.log(error));
    }, []);

    return (
        <div>
            <h1>Lista leków</h1>
            <div>
                <img src={cartImg} alt="Cart" style={{width: "50px", height: "50px"}}/>
                <span>{cart.length}</span>
            </div>
            <ul>
                {leki.map(lek => (
                    <li>
                        <Lek lek={lek} addToCart={() => addToCart(lek)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default List;