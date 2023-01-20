import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipes, getDiets } from "../../redux/actions";
import "./Index.css";

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
  });

  return (
    <div className="container">
      <div className="logo-box">
        <img src="../../images/logoHenry.jpg" />
      </div>
    </div>
  );
}
