import React,{useState, useEffect} from "react";
import Lek from "./Lek";
import LekLekarz from "./LekLekarz";

const ListaLekLekarz = () => {
    const [leki, setLeki] = useState([]);
    const [loading, setLoading] = useState(true);
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
            <ul>
                {leki.map(lek => (
                    <li>
                    <LekLekarz key={lek.id} lek={lek} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ListaLekLekarz;