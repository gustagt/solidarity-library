import React, { useEffect, useState } from "react";
import styles from "./InfoBook.module.css";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { Link } from "react-router-dom";
import Logo from "../../assets/biblio.svg";
import AvaliationGiveBack from "../../components/avaliation/AvaliationGiveBack";
import AvaliationtoRemove from "../../components/avaliation/AvaliationToRemove";


const url = "https://api.transcon.contagem.mg.gov.br/biblio";

const InfoBook = () => {
  const { id } = useParams();

  const { user } = useUserContext();

  const [book, setBook] = useState();
  const [protocol, setProtocol] = useState();
  const [message, setMessage] = useState("");

 
  useEffect(() => {
    function getBook() {
      const corpo = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Token: user.token,
        },
        mode: "cors",
      };

      fetch(url + `/books/${id}`, corpo)
        .then((resposta) => resposta.json())
        .then((data) => {
          setBook(data[0]);
        });
    }

    function getProtocol() {
      const corpo = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Token: user.token,
        },
        mode: "cors",
      };

      fetch(url + `/protocols/id-book/${id}`, corpo)
        .then((resposta) => resposta.json())
        .then((data) => {
          if (data.message) return setMessage(data.message);
          setProtocol(data[0]);
        });
    }
    getBook();
    getProtocol();
  }, [id, user.token]);

  function formatDate(dateNotFormat) {
    const date = new Date(dateNotFormat);
    const dateNew =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return dateNew;
  }

  function handleClickPOST() {
    const data = {
      user_possession: user.username,
      id_book: book.id,
    };

    const body = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Token: user.token,
      },
      body: JSON.stringify(data),
    };

    fetch(url + "/protocols", body)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProtocol(data[0]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function handleClickPUT() {
    const body = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Token: user.token,
      },
      body: JSON.stringify(protocol),
    };

    fetch(url + `/protocols/${protocol.id}`, body)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProtocol(data[0]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }



  return (
    <div className={styles.principal}>
      <div className={styles.navBar}>
        <span className={styles.biblioTitle}>BIBLIO</span>
        <span className={styles.biblioSubtitle}>TECA </span>
        <Link to="/login-adm">SAIR</Link>
      </div>
      <div className={styles.card}>
        {book && !message ? (
          <>
            <img src={`${url}/books/images/cover-${book.id}.jpg`} alt="" />

            <h1>
              <span className={styles.titleH1}>{book.title}</span>
            </h1>
            <span className={styles.infoBookH2}>
              Páginas: <span>{book.pages}</span>
            </span>
            <span className={styles.infoBookH2}>
              Autor: <span>{book.author}</span>
            </span>
            <span className={styles.infoBookH2}>
              Doado em: <span>{formatDate(book.date)}</span>
            </span>
            {!protocol || protocol.returned_at ? (
              <>
              <AvaliationtoRemove/>
              <button className={styles.retirar} onClick={handleClickPOST}>
                Retirar
              </button>
              </>
            ) : (
              <>
              <AvaliationGiveBack/>
              <button className={styles.retirar} onClick={handleClickPUT}>
                Devolver
              </button>
              </>
            )}
          </>
        ) : (
          <div className={`cardMessage ${styles.containerErro}`}>
            <img src={Logo} alt="logo" />
            <b>{message}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoBook;
