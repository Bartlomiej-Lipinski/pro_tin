import React,{useState, useEffect} from "react";
import LekLekarz from "./LekLekarz";

const ListaLekLekarz = () => {
    const [leki, setLeki] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("http://localhost:3001/lek?page=${currentPage}&limit=7")
        .then(response => response.json())
        .then(data => {
            setLeki(data)
        }).catch(error=> console.log(error));
    }, []);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <h1>Lista leków</h1>
            <ul>
                {leki.map(lek => (
                    <li>
                        <LekLekarz key={lek.id} lek={lek}/>
                    </li>
                ))}
            </ul>
            <h2>Strona: {currentPage}</h2>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
}
export default ListaLekLekarz;