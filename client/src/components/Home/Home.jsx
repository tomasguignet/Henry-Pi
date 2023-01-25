import { useDispatch, useSelector } from "react-redux";
import Recipe from "../Recipe/Recipe";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { getDiets, getRecipes } from "../../redux/actions";

export default function Home() {
  const recipes = useSelector((state) => state.currentRecipes);
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
  }, []);

  return (
    <div className="container">
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

      <div className="pagination">
        <Pagination
          totalRecipes={recipes.length}
          recipesPerPage={recipesPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
