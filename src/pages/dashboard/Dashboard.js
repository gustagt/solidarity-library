import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

import Navbar from "../../components/navbar/Navbar";
import { useUserContext } from "../../hooks/useUserContext";
const url = "https://api.transcon.contagem.mg.gov.br/biblio";

const Dashboard = () => {


    const { user } = useUserContext();
  const [books, setBooks] = useState()

  useEffect(() => {
    function getBooks() {
      const corpo = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Token: user.token,
        },
        mode: "cors",
      };

      fetch(url + `/books`, corpo)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setBooks(dados);
        });
    }
    getBooks();
  }, [user.token]);

  return (
    <>
      <Navbar />
      <div className={styles.containerTable}>
        <table>
          <th>ID</th>
          <th>Titulo</th>
          <th>Paginas</th>
          <th>Autor</th>
          <tbody>
            {books && books.map((book) => (
               <tr>
              <td>{book.id}</td>
                <td>{ book.title}</td>
                <td>{ book.pages}</td>
              <td>{book.author}</td>
            </tr>
            ))
            }
           
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
