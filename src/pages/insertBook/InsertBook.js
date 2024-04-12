import React, { useState } from "react";
import styles from "./InsertBook.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useUserContext } from "../../hooks/useUserContext";

// const url = "https://api.transcon.contagem.mg.gov.br/biblio";
const url = "http://10.101.23.197:8001";

const InsertBook = () => {
  const navigate = useNavigate("");

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState();
    const [message, setMessage] = useState("");

    const { user } = useUserContext();


  function handleSubmit(e) {
    e.preventDefault();

    const book = {
      title,
      author,
      pages,
    };

    const formData = new FormData();
    const image = document.querySelector("#img_book").files[0];
    formData.append("book", JSON.stringify(book));
    formData.append("img_book", image);

    const body = {
      method: "POST",
      headers: {
        Token: user.token,
      },
      body: formData,

    };

    fetch(url + "/books", body)
    .then((response) => {
      return response.json();
    })
      .then((data) => {
      if (data.message) return setMessage(data.message);
      navigate('/dashboard')
    })
    .catch((error) => {
      console.log("error", error);
    });
  }
  

  return (
    <div className={styles.containerInsertBook}>
      <Navbar />
      <div className={styles.containerForm}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Inserir Livro</h1>
          <label>
            <input
              type="text"
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label htmlFor="">
            <input
              type="number"
              placeholder="Paginas"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              required
            />
          </label>
          <label htmlFor="">
            <input
              type="text"
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
          <label htmlFor="">
            <input type="file" name="img_book" id="img_book" required />
          </label>
          <button type="submit">Save</button>
        </form>
 </div>
    </div>
  );
};
export default InsertBook;
