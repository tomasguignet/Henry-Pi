import logoHenry from "../../images/logoHenry.jpg";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.box_logo}>
        <Link to={"/home"}>
          <img className={styles.logo_henry} src={logoHenry} alt="logo-henry" />
        </Link>
      </div>

      <div className={styles.box_title}>
        <h2 className={styles.title}>Henry Food</h2>
      </div>

      <div className={styles.box_link}>
        <ul>
          <Link className={styles.link} to={"/home"}>
            <li>Home</li>
          </Link>
          <Link className={styles.link} to={"/recipeForm"}>
            <li>New Recipe</li>
          </Link>
          <Link className={styles.link} to={"/dietForm"}>
            <li>New Diet</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
