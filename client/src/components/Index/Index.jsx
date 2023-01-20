import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipes, getDiets } from "../../redux/actions";
import "./Index.css";
import logoHenry from "../../images/logoHenry.jpg"

export default function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("EN el index");
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
      <div className="button-box">
        <button className="button">Start</button>
      </div>
    </div>
  );
}
