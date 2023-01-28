import React from "react";
import styles from "./Recipe.module.css";

function Recipe({ id, image, name, diets, healthScore }) {
  return (
    <div className={styles.recipeCard}>
      <div className={styles.name}>
        <h1>{name}</h1>
      </div>

      <div className={styles.image}>
        <img src={image} alt="Recipe image" />
      </div>

      <div className={styles.diets}>
        {diets.map((diet) => (
          <h3 key={diet.id}>{diet}</h3>
        ))}
      </div>
    </div>
  );
}

export default Recipe;
