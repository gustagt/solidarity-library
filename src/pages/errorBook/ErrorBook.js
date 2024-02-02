import React from "react";
import styles from "./ErrorBook.module.css";
import Logo from "../../assets/biblio.svg"

const ErrorBook = () => {
  return (
    <div className={`cardMessage ${styles.card}`}>
      <img src={Logo} alt="logo" />
      <p>
        Site bloqueado. Favor Escanear o QR code em um livro da biblioteca
        solidária.
      </p>
    </div>
  );
};

export default ErrorBook;
