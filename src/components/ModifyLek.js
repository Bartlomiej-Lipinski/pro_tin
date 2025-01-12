import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddLekForm from "./AddLekForm";

function ModifyLek() {
    const { id } = useParams();
    const [lek, setLek] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/lek/${id}`)
            .then(response => response.json())
            .then(data => {
                setLek(data);
            })
            .catch(error => {
                console.error('Error fetching lek:', error);
            });
    }, [id]);

    if (!lek) {
        return <div>Error loading lek data.</div>;
    }

    return (
        <div>
            <AddLekForm lek={lek} />
        </div>
    );
}

export default ModifyLek;