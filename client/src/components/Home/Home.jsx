import { useSelector, useDispatch } from "react-redux";
import Recipe from "../Recipe/Recipe";
import Pagination from "../Pagination/Pagination";
/* import Loading from "../Loading/Loading"; */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
/* import { getDiets, getRecipes, loading } from "../../redux/actions"; */
import styles from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { getDiets, getRecipe, getRecipes } from "../../redux/actions";

export default function Home() {
  const recipes = useSelector((state) => state.data.currentRecipes);
  /*   const loader = useSelector((state) => state.loader.loading); */
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);

  //Get current posts
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes&&recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);
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

      <div>
        
        {recipes.length ? currentRecipes.map((recipe) => (
          <div key={recipe.id} className={styles.card}>
            <Link to={`/recipes/${recipe.id}`} >
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
        )): 
        <div>
          <h1>Nothing search!</h1>
          </div>}
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
