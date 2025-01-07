import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LekDescription = () => {
    const { id } = useParams();
    const [lek, setLek] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/lek/${id}`)
            .then(response => response.json())
            .then(data => {
                setLek(data);
            })
            .catch(error => {
                console.error('Error fetching lek data:', error);
            });
    }, [id]);

    if (!lek) {
        return <div>Lek not found</div>;
    }

    return (
        <div className='details'>
            <h1>{lek.Nazwa}</h1>
            <p>Cena: {lek.Cena}</p>
            <p>Opis: {lek.Ulotka}</p>
            <p>Ilość: {lek.Ilosc}</p>
            <p>Ilość Tabletek: {lek.IloscTabletek}</p>
            <p>Ulotka: {lek.Ulotka}</p>
            <p>Kod produktu: {lek.KodProduktu}</p>
            <p>Dawka: {lek.Dawka}mg</p>
            <p>Data ważności: {new Date(lek.DataWaznosci).toLocaleDateString()}</p>
        </div>
    );
};

export default LekDescription;