import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../../redux/actions";

export default function Recipedetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipe(id));
  }, [dispatch, id]);

  const recipe = useSelector((state) => state.data.recipe);

  return (
    <div>

      <div className="left-box">
        <div>
          <h1>{recipe.name}</h1>
        </div>
        <div>
          <img src={recipe.image} alt="recipe-image" />
        </div>
        <div>
          <ul>
            {recipe.diets.map((diet) => (
              <li>{diet}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rigth-box">
        <div>
          <h3>Health Score : {recipe.healthScore}</h3>
        </div>
        <div>
          <p>{recipe.summary}</p>
        </div>
        <div>
          <ol>
            {recipe.instructions?.map(ins => (
              <li>{ins}</li>
            ))}
          </ol>
        </div>
      </div>

    </div>
  );
}
