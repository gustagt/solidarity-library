import React, { useEffect, useState } from "react";
import styles from "./InfoBook.module.css";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import {Star, Heart, Fun, Sad, Shocking} from "./AllEmojis";


const url = "http://10.101.23.197:8000";

const InfoBook = () => {
  const { id } = useParams();

  const { user } = useUserContext();

  const [book, setBook] = useState();
  const [protocol, setProtocol] = useState();
  const [message, setMessage] = useState("");

  const items = [...Array(5).keys()];
  const [activeStar, setActiveStar] = useState();
  const [activeHeart, setActiveHeart] = useState();
  const [activeFun, setActiveFun] = useState();
  const [activeSad, setActiveSad] = useState();
  const [activeShocking, setActiveShocking] = useState();

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

  const onClickStar = (index) => {
    setActiveStar((oldState) => (oldState === index ? undefined : index));
  };
  const onClickHeart = (index) => {
    setActiveHeart((oldState) => (oldState === index ? undefined : index));
  };
  const onClickFun = (index) => {
    setActiveFun((oldState) => (oldState === index ? undefined : index));
  };
  const onClickSad = (index) => {
    setActiveSad((oldState) => (oldState === index ? undefined : index));
  };
  const onClickShocking = (index) => {
    setActiveShocking((oldState) => (oldState === index ? undefined : index));
  };

console.log(activeStar)

  return (
    <div>
      <div className={styles.card}>
        {book && !message ? (
          <>
           
              <img
                src={`http://10.101.23.197:8000/books/images/cover-${book.id}.jpg`}
                alt=""
              />
            
            <h1 className={styles.titleH1}>
              Titulo: <span>{book.title}</span>
            </h1>
            <h2 className={styles.infoBookH2}>
              Paginas: <span>{book.pages}</span>
            </h2>
            <h2 className={styles.infoBookH2}>
              Autor: <span>{book.author}</span>
            </h2>
            <h2 className={styles.infoBookH2}>
              Doado em: <span>{formatDate(book.date)}</span>
            </h2>
            <div className={styles.avaliation}>
              
        <h2 className={styles.avaliationH2}>Avaliação:</h2>
        <div className={styles.star}> 
          {items.map((index) => (
            <Star
              onClick={() => onClickStar(index+1)}
              key={`star_${index}`}
              isActive={index+1 <= activeStar}
            />
          ))}
        </div>
          
          <div className={styles.twoFirst}><hr/>
          <div className={styles.heart}>
          <span>Romântico :</span><br></br>
          {items.map((index) => (
            <Heart
            onClick={() => onClickHeart(index+1)}
            key={`star_${index}`}
            isActive={index+1 <= activeHeart}
            
            />
          ))}</div>
          <div >
          <span>Divertido :</span><br></br>

          {items.map((index) => (
            <Fun
            onClick={() => onClickFun(index+1)}
            key={`star_${index}`}
            isActive={index+1 <= activeFun}
            
            />
          ))}
          </div></div>
          <div className={styles.twoEnd}>
          <div className={styles.sad}>
          <span>Triste :</span><br></br>

          {items.map((index) => (
            <Sad
            onClick={() => onClickSad(index+1)}
            key={`star_${index}`}
            isActive={index+1 <= activeSad}
            
            />
            
          ))}</div>
          
          <div className={styles.shocking}>
          <span>Chocante : </span><br></br>

          {items.map((index) => (
            <Shocking
            onClick={() => onClickShocking(index+1)}
            key={`star_${index}`}
            isActive={index+1 <= activeShocking}
            
            />
          ))}
          </div></div>
          <p> <hr/>Comentários:</p>
          <textarea className={styles.coments} type="text" name="coments" />
        </div>
        
            {!protocol || protocol.returned_at ? (
              <button className={styles.retirar} onClick={handleClickPOST}>Retirar</button>
            ) : (
              <button className={styles.retirar} onClick={handleClickPUT}>Devolver</button>
            )}
          </>
        ) : (
          <div className="cardMessage">
            <b>{message}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoBook;
