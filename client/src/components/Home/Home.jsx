import { useSelector, useDispatch } from "react-redux";
import Recipe from "../Recipe/Recipe";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
/* import { getDiets, getRecipes, loading } from "../../redux/actions"; */
import styles from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { getDiets, getRecipe, getRecipes } from "../../redux/actions";
import Loading from "../Loading/Loading";

export default function Home({currentPage, setCurrentPage}) {
  const recipes = useSelector((state) => state.data.currentRecipes);
  const  allRecipes = useSelector((state) => state.data.allRecipes);
  /*   const loader = useSelector((state) => state.loader.loading); */
  const dispatch = useDispatch();
  
  const [recipesPerPage] = useState(9);

  //Get current posts
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes =
    recipes && recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    console.log("re");
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  /* if(!recipes.length) return (<Loading/>); */

  return (
    /*    <div> */
    <div className={styles.container}>
      {/*       {loader && <Loading/>} */}
      <div className={styles.pagination}>
        <Pagination
          totalRecipes={recipes.length}
          recipesPerPage={recipesPerPage}
          paginate={paginate}
        />
      </div>

      <div className={styles.content}>
        {recipes.length ? (
          currentRecipes.map((recipe) => (
            <div key={recipe.id} className={styles.card}>
              <Link to={`/recipes/${recipe.id}`}>
                <Recipe
                  key={recipe.name}
                  id={recipe.id}
                  image={recipe.image}
                  name={recipe.name}
                  diets={recipe.diets}
                  healthScore={recipe.healthScore}
                />
              </Link>
            </div>
          ))
        ) : (
          <div className={styles.loading}>
            <h1>Searching...</h1>
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        <Pagination
          totalRecipes={recipes.length}
          recipesPerPage={recipesPerPage}
          paginate={paginate}
        />
      </div>
    </div>
    /*     </div> */
  );
}
