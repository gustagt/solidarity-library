import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useUserContext } from "../../hooks/useUserContext";

const url = "http://10.101.23.197:5000";

const Dashboard = () => {
  const navigate = useNavigate("");

    const { user, setUser } = useUserContext();
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
  },[]);

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
