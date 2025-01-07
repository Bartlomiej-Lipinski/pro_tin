import React, {useEffect, useState} from "react";
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
import ModifyLek from "./components/ModifyLek";
import ListOrder from "./components/ListaOrder";
import OrderDetails from "./components/OrderDetails";
import ListaUser from "./components/ListaUser";
import UserDetails from "./components/UserDetails";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = Cookies.get('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('user');
    setUser(null);
    window.location.reload();
  };
  return (
      <Router>
        <div>
          <div className='user-status'>
            <h2>
              {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </h2>
          </div>
          <nav>
            <a href="/">Home</a>
            {!user && (
                <>
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
                </>
            )}
            {user && (
                <>
                  <a href="/add">Order</a>
                  <a href="/addMedicine">Add Medicine</a>
                  <a href="/listaLekowLekarz">Lista Lekow Lekarz</a>
                  <a href="/zamowienia">Lista Zamowien</a>
                  <a href="/user">Lista Uzytkownikow</a>
                  <a onClick={handleLogout}>Logout</a>
                </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<MainP />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/lek/:id" element={<LekDescription />} />
            {user && (
                <>
                  <Route path="/add" element={<OrderForm />} />
                  <Route path="/addMedicine" element={<AddLekForm />} />
                  <Route path="/listaLekowLekarz" element={<ListaLekLekarz />} />
                  <Route path="/modify-lek/:id" element={<ModifyLek />} />
                  <Route path='/zamowienia' element={<ListOrder />} />
                  <Route path="/zamowienia/:id" element={<OrderDetails />} />
                  <Route path='/user' element={<ListaUser />} />
                  <Route path="/user/:id" element={<UserDetails />} />
                </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
