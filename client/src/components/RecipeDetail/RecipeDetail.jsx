import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipe, cleanRecipe } from "../../redux/actions";
import styles from "./RecipeDetail.module.css";

export default function Recipedetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipe(id));
    return dispatch(cleanRecipe());

  }, [dispatch, id]);

  const recipe = useSelector((state) => state.data.recipe);

  return (
    <div className={styles.container}>

      <div className={styles.content}>

        <div className={styles.leftBox}>
          <div className={styles.name}>
            <h1>{recipe.name}</h1>
          </div>
          <div className={styles.image}>
            <img src={recipe.image} alt="recipe-image" />
          </div>
          <div className={styles.diets}>
            <ul>
              {recipe.diets?.map((diet) => (
                <li key={diet}>{diet}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.rightBox}>
          <div className={styles.healthScore}>
            <h3>Health Score : {recipe.healthScore}</h3>
          </div>
          <div className={styles.summary}>
            <p>{recipe.summary}</p>
          </div>
          <div className={styles.instructions}>
            <ol>
              {recipe.instructions?.map(ins => (
                <li key={ins}>{ins}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

    </div>
  );
}
