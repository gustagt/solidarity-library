// React
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


// components

// pages
import Login from "./pages/login/Login"
import LoginAdm from "./pages/loginAdm/LoginAdm"
import InfoBook from "./pages/infoBook/InfoBook";
import InsertBook from "./pages/insertBook/InsertBook";
import Dashboard from "./pages/dashboard/Dashboard";



// contexts


import "./App.css";

function App() {
  //usuario do contexto

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/info-book/:id" element={<InfoBook />}></Route>
          <Route path="/login-adm" element={<LoginAdm />}></Route>
          <Route path="/insert-book" element={<InsertBook />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="*" element={<Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
