/* import { useEffect, useState } from "react"; */
import { Link } from "react-router-dom";
/* import { useDispatch } from "react-redux"; */
/* import axios from "axios"; */
/* import { getRecipes, getDiets } from "../../redux/actions"; */
import styles from  "./Index.module.css";
import logoHenry from "../../images/logoHenry.jpg";

export default function Index() {
/*   const dispatch = useDispatch(); */

/*   useEffect(async () => {
    axios.get("http://localhost:3001/diets/preCharge").then(
      (data) => console.log("DataBase ready!"),
      (error) => console.log(error.message)
    );
    dispatch(getDiets());
    dispatch(getRecipes());
  }, [dispatch]); */

  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <img className={styles.logoImg} src={logoHenry} alt="henry-logo" />
      </div>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>Henry Food</h1>
      </div>
      <div className={styles.subtitleBox}>
        <h3 className={styles.subtitle}>Lets see whats inside!</h3>
      </div>
      <Link to={"/home"}>
        <div className={styles.buttonBox}>
          <button type="button" className={styles.button}>
            Start
          </button>
        </div>
      </Link>
    </div>
  );
}
