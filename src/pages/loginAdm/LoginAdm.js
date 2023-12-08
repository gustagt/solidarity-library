import React, { useState } from "react";
import styles from "./LoginAdm.module.css";
import { useNavigate } from "react-router-dom";



const LoginAdm = () => {

  const navigate = useNavigate("");

  function handleSubmit() {

    navigate("/dashboard");
  }

  return (
    <div className={styles.containerLogin}>
      <form className={styles.formLogin} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User"
   
        />
        <input
          type="password"
          placeholder="Password"

        />
        <button>NEXT</button>
      </form>
    </div>
  );
};

export default LoginAdm;
