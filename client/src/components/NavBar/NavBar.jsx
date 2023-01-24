import logoHenry from "../../images/logoHenry.jpg";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="container">
      <div className="box-logo">
        <Link to={"/home"}>
          <img className="logo-henry" src={logoHenry} alt="logo-henry" />
        </Link>
      </div>

      <div className="box-title">
        <h2 className="title">Henry Food</h2>
      </div>

      <div className="box-link">
        <ul>
          <Link to={"/home"}>
            <li>Home</li>
          </Link>
          <Link to={"/recipeForm"}>
            <li>New Recipe</li>
          </Link>
          <Link to={"/dietForm"}>
            <li>New Diet</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
