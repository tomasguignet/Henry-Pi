import {  useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import Pagination from "../Pagination/Pagination";
/* import Loading from "../Loading/Loading"; */
import { Link } from "react-router-dom";
import {  useEffect, useState } from "react";
/* import { getDiets, getRecipes, loading } from "../../redux/actions"; */
import styles from "./Home.module.css";

export default function Home() {
  const recipes = useSelector((state) => state.data.currentRecipes);
/*   const loader = useSelector((state) => state.loader.loading); */
/*   const dispatch = useDispatch(); */
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);

  //Get current posts
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

useEffect(() => {

},[recipes])
  return (
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
        {currentRecipes.map((recipe) => (
          <div className={styles.card}>
            <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
              <Recipe
                key={recipe.id}
                id={recipe.id}
                image={recipe.image}
                name={recipe.name}
                diets={recipe.diets}
                healthScore={recipe.healthScore}
              />
            </Link>
          </div>
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
