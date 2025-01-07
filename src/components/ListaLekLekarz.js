import React,{useState, useEffect} from "react";
import Lek from "./Lek";
import LekLekarz from "./LekLekarz";
import Order from "./Order";

const ListaLekLekarz = () => {
    const [leki, setLeki] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

    useEffect(() => {
        fetch("http://localhost:3001/lek")
        .then(response => response.json())
        .then(data => {
            setLeki(data)
        }).catch(error=> console.log(error));
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastLek = currentPage * ordersPerPage;
    const indexOfFirstLek = indexOfLastLek - ordersPerPage;
    const currentLeki = leki.slice(indexOfFirstLek, indexOfLastLek);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(leki.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h1>Lista leków</h1>
            <ul>
                {currentLeki.map(lek => (
                    <li>
                        <LekLekarz key={lek.id} lek={lek}/>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}
export default ListaLekLekarz;