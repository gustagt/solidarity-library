import React, {useState} from "react";
import { Star, Heart, Fun, Sad, Shocking } from "../allEmoijs/AllEmojis";
import styles from "../avaliation/AvaliationGiveBack.module.css" 


const AvaliationGiveBack = () => {

    const items = [...Array(5).keys()];
    const [activeStar, setActiveStar] = useState();
    const [activeHeart, setActiveHeart] = useState();
    const [activeFun, setActiveFun] = useState();
    const [activeSad, setActiveSad] = useState();
    const [activeShocking, setActiveShocking] = useState();


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
    
    
   
    return(
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
                  placeholder="Comente sobre o Livro!"
                />
              </div>
            </div>
        </>
    )
   
};
export default AvaliationGiveBack;
