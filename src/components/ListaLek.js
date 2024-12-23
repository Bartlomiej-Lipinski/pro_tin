import React,{useState, useEffect} from "react";
import Lek from "./Lek";

const List = () => {
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
                    <Lek key={lek.id} lek={lek} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default List;