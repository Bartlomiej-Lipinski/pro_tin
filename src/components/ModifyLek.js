import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddLekForm from "./AddLekForm";

function ModifyLek() {
    const { id } = useParams();
    const [lek, setLek] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/lek/${id}`)
            .then(response => response.json())
            .then(data => {
                setLek(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching lek:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

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