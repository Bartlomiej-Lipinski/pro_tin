import React,{useState, useEffect} from "react";
import Lek from "./Lek";
import cartImg from "./shopping-cart.png";
import Cookies from "js-cookie";
const List = () => {
    const [leki, setLeki] = useState([]);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

    const addToCart = (lek) => {
        setCart([...cart, lek.id]);
    };
    useEffect(() => {
        const loggedInUser = Cookies.get('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

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
            <div>
                <img src={cartImg} alt="Cart" style={{width: "50px", height: "50px"}}/>
                <span>{cart.length}</span>
            </div>
            <ul>
                {currentLeki.map(lek => (
                    <li>
                        <Lek key={lek.id} lek={lek} user={user}/>
                    </li>
                ))}
            </ul>
            <button onClick={()=>{
                Cookies.set('cart', JSON.stringify(cart));
                window.location.href = "/add";
            }
            }>Proced to Order</button>
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
export default List;