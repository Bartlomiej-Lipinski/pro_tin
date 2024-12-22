import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainP from "./components/MainP";
import Form from "./components/OrderForm";
import LoginForm from "./components/loginForm";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <a href="/">Home</a> | <a href="/add">Order </a> | <a href="/login">Login</a>
        </nav>
        <Routes>
          <Route path="/" element={<MainP/>} />
          <Route path="/add" element={<Form />} />
          <Route path="/login" element={<LoginForm />} />
          {/*<Route path="/item/:id" element={<LekDescription />} />*/}
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
