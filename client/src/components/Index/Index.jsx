import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getRecipes, getDiets } from "../../redux/actions";
import "./Index.css";
import logoHenry from "../../images/logoHenry.jpg"

export default function Index() {
  const dispatch = useDispatch();

  useEffect(async () => {
    axios.get("http://localhost:3001/diets/preCharge").then(
      ((data) => console.log("DataBase ready!")),
      ((error) => console.log(error.message))
    );
    dispatch(getDiets());
    dispatch(getRecipes());
  });

  return (
    <div className="container">
      <div className="logo-box">
        <img className="logo-img" src={logoHenry} alt="henry-logo" />
      </div>
      <div className="title-box">
        <h1 className="title">Henry Food</h1>
      </div>
      <div className="subtitle-box">
        <h3 className="subtitle">Lets see whats inside!</h3>
      </div>
      <Link to={"/home"}>
        <div className="button-box">
          <button type="button" className="button">Start</button>
        </div>
      </Link>
    </div>
  );
}
