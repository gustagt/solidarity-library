import React, { useState } from "react";
import styles from "./InsertBook.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const url = "http://localhost:5000";

const InsertBook = () => {
  const navigate = useNavigate("");

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title,
      author,
      pages,
    };

    const body = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url + "/books", body)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <div className={styles.containerInsertBook}>
      <Navbar />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label >
          <input
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <input
            type="number"
            placeholder="Paginas"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </label>
        <label htmlFor="">
          <input
            type="text"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default InsertBook;
