import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainP from "./components/MainP";
import OrderForm from "./components/OrderForm";
import LoginForm from "./components/loginForm";
import NotFound from "./components/NotFound";
import LekDescription from "./components/LekDescription";
import RegisterForm from "./components/RegisterForm";
import AddLekForm from "./components/AddLekForm";
import ListaLekLekarz from "./components/ListaLekLekarz";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <a href="/">Home</a> | <a href="/add">Order </a> | <a href="/login">Login</a> | <a href="/register">Register</a> | <a href="/addMedicine">Add Medicine</a> | <a href="/listaLekowLekarz">Lista Lekow Lekarz</a>
        </nav>
        <Routes>
          <Route path="/" element={<MainP/>} />
          <Route path="/register" element={<RegisterForm />}/>
          <Route path="/addMedicine" element={<AddLekForm />} />
          <Route path="/listaLekowLekarz" element={<ListaLekLekarz />} />
          <Route path="/add" element={<OrderForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/lek/:id" element={<LekDescription />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
