import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import logo from "../../assets/rodape.png"

const url = "http://10.101.22.20:8000";

const Login = () => {

  const { id } = useParams();
  
  const [username, setUsername ] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUserContext();

  const navigate = useNavigate("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    const body = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url + '/login', body)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.token) throw data.message
        // Faça algo com os dados retornador
        const dataUser = {
          username: data.username,
          displayName: data.displayName,
          token: data.token,
        };
        
        setUser(dataUser);

        localStorage.setItem("user-library-solidary", JSON.stringify(dataUser));
        navigate(`/info-book/${id}`)
      })
      .catch((error) => {
        console.log("error", error);
        setPassword("");
        setUsername("");
      });
  }

  return (
    <div className={styles.containerLogin}>
      <form className={styles.formLogin} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">NEXT</button>
      </form>
      <div className={styles.rodape}>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Login;
