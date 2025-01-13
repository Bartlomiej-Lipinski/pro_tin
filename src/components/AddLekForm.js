import React, { useState } from "react";
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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!nazwa) newErrors.nazwa = "Nazwa is required";
    if (!cena) newErrors.cena = "Cena is required";
    if (!ulotka) newErrors.ulotka = "Ulotka is required";
    if (!ilosc) newErrors.ilosc = "Ilość is required";
    if (!ilosc_tabletek) newErrors.ilosc_tabletek = "Ilość tabletek is required";
    if (!kod_produktu) newErrors.kod_produktu = "Kod Produktu is required";
    if (!dawka) newErrors.dawka = "Dawka is required";
    if (!data_waznosci) newErrors.data_waznosci = "Data ważności is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lek) {
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    const newLek = {
      nazwa: nazwa || lek.Nazwa,
      cena: cena || lek.Cena,
      ulotka: ulotka || lek.Ulotka,
      ilosc: ilosc || lek.Ilosc,
      ilosc_tabletek: ilosc_tabletek || lek.IloscTabletek,
      kod_produktu: kod_produktu || lek.KodProduktu,
      dawka: dawka || lek.Dawka,
      data_waznosci: data_waznosci || lek.DataWaznosci
    };
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
          if (data.message === "Lek zaktualizowany pomyślnie"|| data.message === "Lek dodany pomyślnie") {
            console.log(`${lek ? "Updated" : "Added"} lek:`, data);
            navigate(`/lek/${lek.Id}`);
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
          <input type="text" placeholder={lek ? lek.Nazwa : 'Nazwa'} value={nazwa} onChange={(e) => setNazwa(e.target.value)} />
          {errors.nazwa && <p className="error">{errors.nazwa}</p>}
          <input type="text" placeholder={lek ? lek.Cena : 'Cena'} value={cena} onChange={(e) => setCena(e.target.value)} />
          {errors.cena && <p className="error">{errors.cena}</p>}
          <input type="text" placeholder={lek ? lek.Ulotka : 'Ulotka'} value={ulotka} onChange={(e) => setUlotka(e.target.value)} />
          {errors.ulotka && <p className="error">{errors.ulotka}</p>}
          <input type="text" placeholder={lek ? lek.Ilosc : 'Ilość'} value={ilosc} onChange={(e) => setIlosc(e.target.value)} />
          {errors.ilosc && <p className="error">{errors.ilosc}</p>}
          <input type="text" placeholder={lek ? lek.IloscTabletek : 'Ilość tabletek'} value={ilosc_tabletek} onChange={(e) => setIlosc_tabletek(e.target.value)} />
          {errors.ilosc_tabletek && <p className="error">{errors.ilosc_tabletek}</p>}
          <input type="text" placeholder={lek ? lek.KodProduktu : 'Kod Produktu'} value={kod_produktu} onChange={(e) => setKod_produktu(e.target.value)} />
          {errors.kod_produktu && <p className="error">{errors.kod_produktu}</p>}
          <input type="text" placeholder={lek ? lek.Dawka : 'Dawka'} value={dawka} onChange={(e) => setDawka(e.target.value)} />
          {errors.dawka && <p className="error">{errors.dawka}</p>}
          <input type="date" placeholder={lek ? lek.DataWaznosci : 'Data ważności'} value={data_waznosci} onChange={(e) => setData_waznosci(e.target.value)} />
          {errors.data_waznosci && <p className="error">{errors.data_waznosci}</p>}
          <button type="submit">{lek ? "Zapisz zmiany" : "Dodaj"}</button>
        </form>
      </div>
  );
};

export default Form;