import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipes, getRecipe, getDiets } from "../../redux/actions";

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
  });

  return (
  <div>
    
  </div>
  );
}
