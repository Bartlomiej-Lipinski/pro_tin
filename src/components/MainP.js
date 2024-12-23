import React from "react";
import {Link} from "react-router";
import ListaLek from "./ListaLek";

function MainPage() {
    const [data, setData] = React.useState([]);

    return(
        <div>
            <ListaLek />
        </div>

    );
}
export default MainPage;