import { useDispatch, useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { getDiets, getRecipes } from "../../redux/actions";
import styles from "./Home.module.css";

export default function Home() {
  const recipes = useSelector((state) => state.data.currentRecipes);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);

  //Get current posts
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        {currentRecipes.map((recipe) => (
          <Link to={`/recipes/${recipe.id}`}>
            <Recipe
              id={recipe.id}
              image={recipe.image}
              name={recipe.name}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
            />
          </Link>
        ))}
      </div>

      <div className={styles.pagination}>
        <Pagination
          totalRecipes={recipes.length}
          recipesPerPage={recipesPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
