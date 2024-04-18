import React, { useEffect, useState } from "react";
import styles from "./InfoBook.module.css";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { Link } from "react-router-dom";
import Logo from "../../assets/biblio.svg";
import { Star, Heart, Fun, Sad, Shocking } from "../../components/allEmoijs/AllEmojis";
import AvaliationtoRemove from "../../components/avaliation/AvaliationToRemove";



// const url = "https://api.transcon.contagem.mg.gov.br/biblio";
const url = "http://10.101.23.197:8001";


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
  const [comments, setComments] = useState();

  const handleChange = (event) => {
    setComments(event.target.value);
  };

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
          setBook(data);
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
    const protocolAssessments = {
      id: protocol.id,
      id_book: protocol.id_book,
      remove_at: protocol.remove_at,
      returned_at: protocol.returned_at,
      user_possession: protocol.user_possession,
      assessment: {
        comments: comments ? comments : null,
        fun: activeFun ? activeFun : null,
        overall: activeStar ? activeStar : null,
        romantic: activeHeart ? activeHeart : null,
        sad: activeSad ? activeSad : null,
        shocking: activeShocking ? activeShocking : null,
      }
    };
     console.log(protocolAssessments)

    const body = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Token: user.token,
      },
      body: JSON.stringify(protocolAssessments),
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
      <div className={styles.navBar}>
        <span className={styles.biblioTitle}>BIBLIO</span>
        <span className={styles.biblioSubtitle}>TECA </span>
        <Link to={`/login/info-book/${id}`}>SAIR</Link>
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
                <AvaliationtoRemove book = {book}/>
                <button className={styles.retirar} onClick={handleClickPOST}>
                  Retirar
                </button>
              </>
            ) : (
              <>
                <div className={styles.avaliation}>
                  <h2>Avaliação:</h2>
                  <div className={styles.star}>
                    {items.map((index) => (
                      <Star
                        onClick={() => onClickStar(index + 1)}
                        key={`star_${index}`}
                        isActive={index + 1 <= activeStar}
                      />
                    ))}
                  </div>

                  <div className={styles.twoFirst}>
                    <div className={styles.heart}>
                      <span>Romântico: </span>
                      {items.map((index) => (
                        <Heart
                          onClick={() => onClickHeart(index + 1)}
                          key={`star_${index}`}
                          isActive={index + 1 <= activeHeart}
                        />
                      ))}
                    </div>
                    <div className={styles.Fun}>
                      <span>Divertido :</span>

                      {items.map((index) => (
                        <Fun
                          onClick={() => onClickFun(index + 1)}
                          key={`star_${index}`}
                          isActive={index + 1 <= activeFun}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={styles.twoEnd}>
                    <div className={styles.sad}>
                      <span>Triste :</span>

                      {items.map((index) => (
                        <Sad
                          onClick={() => onClickSad(index + 1)}
                          key={`star_${index}`}
                          isActive={index + 1 <= activeSad}
                        />
                      ))}
                    </div>

                    <div className={styles.shocking}>
                      <span>Chocante : </span>

                      {items.map((index) => (
                        <Shocking
                          onClick={() => onClickShocking(index + 1)}
                          key={`star_${index}`}
                          isActive={index + 1 <= activeShocking}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={styles.comentsText}>
                    <h2>Comentários:</h2>
                    <textarea
                      type="text"
                      name="coments"
                      onChange={handleChange}
                      value={comments}
                      placeholder="Comente sobre o Livro!"
                    />
                  </div>
                </div>
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
