import React, { useEffect, useState } from "react";
import styles from "./InfoBook.module.css";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

const url = "http://10.101.23.197:5000";

const InfoBook = () => {
  const { id } = useParams();

  const { user, setUser } = useUserContext();

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
  }, [id]);

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
    <div>
      <div className={styles.card}>
        {book && !message ? (
          <>
            <div>
              <img
                src={`http://10.101.23.197:5000/books/images/cover-${book.id}.jpg`}
                alt=""
              />
            </div>
            <h1>
              Titulo: <span>{book.title}</span>
            </h1>
            <h2>
              Paginas:<span>{book.pages}</span>
            </h2>
            <h2>
              Autor:<span>{book.author}</span>
            </h2>
            <h3>
              Doado em:<span>{formatDate(book.date)}</span>
            </h3>
            {!protocol || protocol.returned_at ? (
              <button onClick={handleClickPOST}>Retirar</button>
            ) : (
              <button onClick={handleClickPUT}>Devolver</button>
            )}
          </>
        ) : (
          <div>
            <b>{message}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoBook;
