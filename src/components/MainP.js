import React from "react";
import {Link} from "react-router";

function MainPage() {
    const [data, setData] = React.useState([]);

    return(
        <div>
            <h1>Lista leków</h1>
            <ul>
                {data.map(lek => (
                    <li key={lek.id}>
                        <Link to={`/item/${lek.id}`}>{lek.name}</Link>
                    </li>
                ))}
            </ul>
        </div>

    );
}
export default MainPage;