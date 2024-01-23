import React, { useState } from "react";
import styles from "./LoginAdm.module.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

const url = "http://10.101.23.197:8000";

const LoginAdm = () => {
  const navigate = useNavigate("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {  setUser } = useUserContext();

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

    fetch(url + "/login", body)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.token) throw data.message;
        // Faça algo com os dados retornador
        const dataUser = {
          username: data.username,
          displayName: data.displayName,
          token: data.token,
        };

        setUser(dataUser);

        localStorage.setItem("user", JSON.stringify(dataUser));
        navigate(`/dashboard`);
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">NEXT</button>
      </form>
    </div>
  );
};

export default LoginAdm;
