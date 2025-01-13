import React,{useState, useEffect} from "react";
import Lek from "./Lek";
import cartImg from "./shopping-cart.png";
import Cookies from "js-cookie";
const List = () => {
    const [leki, setLeki] = useState([]);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 7;

    const addToCart = (lek) => {
        setCart([...cart, lek.Id]);
    };
    useEffect(() => {
        const loggedInUser = Cookies.get('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3001/lek?page=${currentPage}&limit=7`)
        .then(response => response.json())
        .then(data => {
            setLeki(data)
            setHasMore(data.length === limit);
        }).catch(error=> console.log(error));
    }, [currentPage]);
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

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
                        <Lek key={lek.id} lek={lek} user={user} addToCart={() => addToCart(lek)}/>
                    </li>
                ))}
            </ul>
            <h2>Strona: {currentPage}</h2>
            {user && <button onClick={() => {
                Cookies.set('cart', JSON.stringify(cart));
                window.location.href = "/add";
            }
            }>Proced to Order
            </button>}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={!hasMore}>
                    Next
                </button>
            </div>
        </div>
    );
}
export default List;