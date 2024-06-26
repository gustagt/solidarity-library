import styles from "./AvaliationToRemove.module.css";
import React, { useEffect, useState } from "react";


//Importação para o carrossel dos comentarios
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

//Importação progress bar
import ProgressBar from "@ramonak/react-progress-bar";

const items = [...Array(5).keys()];
const Star = ({ isActive }) => {
  return (
    <>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill={isActive ? "#fccc2b" : "#dedede"}
          width={15}
          height={15}
        >
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
      </button>
    </>
  );
};
const Classification = ({ isActive }) => {
  return (
    <>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill={isActive ? "#fccc2b" : "#dedede"}
          width={15}
          height={15}
        >
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
      </button>
    </>
  );
};


const AvaliationtoRemove = ({book}) => {

  const datas = book.assessments;

  function formatDate(dateNotFormat) {
    const date = new Date(dateNotFormat);
    const dateNew =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return dateNew;
  }

  let overall = 0;
  let romantic = 0;
  let fun = 0;
  let shocking = 0;
  let sad = 0;

  for (const i of datas) {

    overall += i.overall / datas.length;
    romantic += i.romantic / datas.length;
    fun += i.fun / datas.length;
    shocking += i.shocking / datas.length;
    sad += i.sad / datas.length;
  }
  
  register();
  
  return (
    <>
      <div className={styles.avaliation}>
        <div>
          <h2>Avaliações:</h2>
          <div className={styles.star}>
            <span className={styles.numberRate}>{overall.toFixed(1)}</span>
            {items.map((index) => (
              <Star key={`star_${index}`} isActive={index + 1 <= overall} />
            ))}
          </div>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressSpan}>
            <span>Romântico:</span>
            <span>Divertido:</span>
            <span>Chocante:</span>
            <span>Triste:</span>
          </div>
          <div className={styles.barras}>
            <ProgressBar
              completed={romantic}
              maxCompleted={5}
              height="10px"
              width="110px"
              margin="9px"
              bgColor ="#ffd000"
              customLabel=" "
            />
            <ProgressBar
              completed={fun}
              maxCompleted={5}
              height="10px"
              width="110px"
              margin="9px"
              bgColor ="#ffd000"
              customLabel=" "
            />
            <ProgressBar
              completed={shocking}
              maxCompleted={5}
              height="10px"
              width="110px"
              margin="9px"
              bgColor ="#ffd000"
              customLabel=" "
            />
            <ProgressBar
              completed={sad}
              maxCompleted={5}
              height="10px"
              width="110px"
              margin="9px"
              bgColor ="#ffd000"
              customLabel=" "
            />
          </div>
        </div>
        <h2>Comentários</h2>
        <Swiper slidesPerView={1}>
          {datas &&
            datas.map((dado) => (
              <SwiperSlide key={dado.id}>
                <div className={styles.comentsText}>
                  <div className={styles.classification}>
                    {items.map((index) => (
                      <Classification
                        key={`star_${index}`}
                        isActive={index + 1 <= dado.overall}
                      />
                    ))}
                  </div>
                  <span className={styles.name}> {dado.protocol.user_possession}</span>
                  <span className={styles.date}> {formatDate(dado.protocol.returned_at)}</span>
                  <span className={styles.comments}> {dado.comments}</span>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default AvaliationtoRemove;
