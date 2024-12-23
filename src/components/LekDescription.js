import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LekDescription = () => {
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
                console.error('Error fetching lek data:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!lek) {
        return <div>Lek not found</div>;
    }

    return (
        <div className='details'>
            <h1>{lek.nazwa}</h1>
            <p>Cena: {lek.cena}</p>
            <p>Opis: {lek.ulotka}</p>
            <p>Ilość: {lek.ilosc}</p>
            <p>Ilość Tabletek: {lek.ilosc_tabletek}</p>
            <p>Ulotka: {lek.ulotka}</p>
            <p>Kod produktu: {lek.kod_produktu}</p>
            <p>Dawka: {lek.dawka}mg</p>
            <p>Data ważności: {new Date(lek.data_waznosci).toLocaleDateString()}</p>
        </div>
    );
};

export default LekDescription;