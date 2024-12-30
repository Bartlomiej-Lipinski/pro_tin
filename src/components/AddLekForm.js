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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (lek) {
      setNazwa(lek.nazwa);
      setCena(lek.cena);
      setUlotka(lek.ulotka);
      setIlosc(lek.ilosc);
      setIlosc_tabletek(lek.ilosc_tabletek);
      setKod_produktu(lek.kod_produktu);
      setDawka(lek.dawka);
      setData_waznosci(lek.data_waznosci);
    }
  }, [lek]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLek = {
      nazwa,
      cena,
      ulotka,
      ilosc,
      ilosc_tabletek,
      kod_produktu,
      dawka,
      data_waznosci
    };
    setLoading(true);

    const url = lek ? `http://localhost:3001/lek/${lek.id}` : "http://localhost:3001/lek";
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
        if (data.id) {
          console.log(`${lek ? "Updated" : "Added"} lek:`, data);
          navigate(`/lek/${data.id}`);
        } else {
          console.log(`Error ${lek ? "updating" : "adding"} lek`);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>{lek ? "Edytuj" : "Dodaj"} lek</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nazwa" value={nazwa} onChange={(e) => setNazwa(e.target.value)} />
        <input type="text" placeholder="Cena" value={cena} onChange={(e) => setCena(e.target.value)} />
        <input type="text" placeholder="Ulotka" value={ulotka} onChange={(e) => setUlotka(e.target.value)} />
        <input type="text" placeholder="Ilość" value={ilosc} onChange={(e) => setIlosc(e.target.value)} />
        <input type="text" placeholder="Ilość tabletek" value={ilosc_tabletek} onChange={(e) => setIlosc_tabletek(e.target.value)} />
        <input type="text" placeholder="Kod produktu" value={kod_produktu} onChange={(e) => setKod_produktu(e.target.value)} />
        <input type="text" placeholder="Dawka" value={dawka} onChange={(e) => setDawka(e.target.value)} />
        <input type="date" placeholder="Data ważności" value={data_waznosci} onChange={(e) => setData_waznosci(e.target.value)} />
        <button type="submit" disabled={loading}>{lek ? "Zapisz zmiany" : "Dodaj"}</button>
      </form>
    </div>
  );
};

export default Form;