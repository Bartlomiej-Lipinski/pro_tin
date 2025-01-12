import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ lek }) => {
  const [nazwa, setNazwa] = useState("");
  const [cena, setCena] = useState("");
  const [ulotka, setUlotka] = useState("");
  const [ilosc, setIlosc] = useState("");
  const [ilosc_tabletek, setIlosc_tabletek] = useState("");
  const [kod_produktu, setKod_produktu] = useState("");
  const [dawka, setDawka] = useState("");
  const [data_waznosci, setData_waznosci] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLek = {};
      newLek.nazwa = nazwa || lek.Nazwa;
      newLek.cena = cena || lek.Cena;
      newLek.ulotka = ulotka || lek.Ulotka;
      newLek.ilosc = ilosc || lek.Ilosc;
      newLek.ilosc_tabletek = ilosc_tabletek || lek.IloscTabletek;
      newLek.kod_produktu = kod_produktu || lek.KodProduktu;
      newLek.dawka = dawka || lek.Dawka;
      newLek.data_waznosci = data_waznosci || lek.DataWaznosci;
    const url = lek ? `http://localhost:3001/lek/${lek.Id}` : "http://localhost:3001/lek";
    const method = lek ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newLek)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Lek zaktualizowany pomyślnie") {
          console.log(`${lek ? "Updated" : "Added"} lek:`, data);
          navigate(`/lek`);
        } else {
          console.log(`Error ${lek ? "updating" : "adding"} lek`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>{lek ? "Edytuj" : "Dodaj"} lek</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder={lek?lek.Nazwa:'Nazwa'} value={nazwa} onChange={(e) => setNazwa(e.target.value)} />
        <input type="text" placeholder={lek?lek.Cena:'Cena'} value={cena} onChange={(e) => setCena(e.target.value)} />
        <input type="text" placeholder={lek?lek.Ulotka:'Ulotka'} value={ulotka} onChange={(e) => setUlotka(e.target.value)} />
        <input type="text" placeholder={lek?lek.Ilosc:'Ilość'} value={ilosc} onChange={(e) => setIlosc(e.target.value)} />
        <input type="text" placeholder={lek?lek.IloscTabletek:'Ilość tabletek'} value={ilosc_tabletek} onChange={(e) => setIlosc_tabletek(e.target.value)} />
        <input type="text" placeholder={lek?lek.KodProduktu:'Kod Produktu'} value={kod_produktu} onChange={(e) => setKod_produktu(e.target.value)} />
        <input type="text" placeholder={lek?lek.Dawka:'Dawka'} value={dawka} onChange={(e) => setDawka(e.target.value)} />
        <input type="date" placeholder={lek?lek.DataWaznosci:'Data ważności'} value={data_waznosci} onChange={(e) => setData_waznosci(e.target.value)} />
        <button type="submit" >{lek ? "Zapisz zmiany" : "Dodaj"}</button>
      </form>
    </div>
  );
};

export default Form;