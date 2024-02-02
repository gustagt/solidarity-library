// React
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


// components

// pages
import Login from "./pages/login/Login"
import LoginAdm from "./pages/loginAdm/LoginAdm"
import InfoBook from "./pages/infoBook/InfoBook";
import InsertBook from "./pages/insertBook/InsertBook";
import Dashboard from "./pages/dashboard/Dashboard";
import ErrorBook from "./pages/errorBook/ErrorBook";


// contexts


import "./App.css";
import { useUserContext } from "./hooks/useUserContext";

function App() {
  //usuario do contexto
  const { user } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login/:path/:id" element={<Login />}></Route>
          <Route path="/login-adm" element={<LoginAdm />}></Route>
          <Route
            path="/info-book/:id"
            element={
              user ? (
                <InfoBook />
              ) : (
                <Navigate to={`/login${window.location.pathname}`} />
              )
            }
          ></Route>
          <Route
            path="/insert-book"
            element={user ? <InsertBook /> : <Navigate to="/login-adm" />}
          ></Route>
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login-adm" />}
          ></Route>
          <Route
            path="/error-book"
            element={<ErrorBook />}
          ></Route>
          <Route path="*" element={<Navigate to="/error-book" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
