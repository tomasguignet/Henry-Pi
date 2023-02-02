import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets, getRecipes } from "../../redux/actions";
import styles from "./RecipeForm.module.css";

export default function RecipeForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.data.diets);

  const [instructions, setInstructions] = useState([]);

  const [expanded, setExpanded] = useState({
    diets: false,
    dishes: false,
  });

  const [dishes] = useState([
    "Main course",
    "Side dish",
    "Dessert",
    "Appetizer",
    "Salad",
    "Bread",
    "Breakfast",
    "Soup",
    "Beverage",
    "Sauce",
    "Marinade",
    "Fingerfood",
    "Snack",
    "Drink",
  ]);

  const [inputs, setInputs] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    diets: [],
    dishTypes: [],
    instructions: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    healthScore: "",
    diets: "",
    dishTypes: "",
    instructions: "",
  });

  function showCheckboxes(name) {
    if (!expanded[name]) {
      setExpanded({
        ...expanded,
        [name]: true,
      });
    } else {
      setExpanded({
        ...expanded,
        [name]: false,
      });
    }
  }

  const addInstruction = (event) => {
    setInstructions([
      ...instructions,
      {
        id: instructions.at(-1) ? instructions.at(-1).id + 1 : 0,
        text: "",
      },
    ]);
  };

  const validate = ({
    name,
    summary,
    healthScore,
    diets,
    dishTypes,
    instructions,
  }) => {
    const errors = {};

    if (!name)  (errors.name = "Se requiere un nombre");
    else if (!summary) (errors.summary = "Se requiere un resumen de la receta");
    else if (healthScore < 0) (errors.healthScore = "La puntuacion no puede ser negativa");
    else if (!diets.length) errors.diets = "Tiene que tener al menos una dieta";
    else if (!dishTypes.length)
      errors.dishTypes = "Tiene que tener al menos un tipo de plato";
    if (instructions.length > 0) {
      for (const i of instructions) {
        if (!i.length)
          errors.instructions = "No puede haber una instruccion vacia";
      }
    }
    return errors;
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setInputs({
      ...inputs,
      [property]: value,
    });

    setErrors(
      validate({
        ...inputs,
        [property]: value,
      })
    );
  };

  const handleInstructions = (event, id) => {
    let newArray = [];
    const text = event.target.value;
    console.log(id);
    instructions[id].text = text;
    /* setInstructions([...instructions, ]); */

    instructions.forEach((i) => {
      newArray.push(i.text);
    });

    setInputs({
      ...inputs,
      instructions: newArray,
    });
    setErrors(
      validate({
        ...inputs,
        instructions: newArray,
      })
    );
  };

  const handleCheckbox = (event, name) => {
    const value = event.target.value;

    let array = inputs[name];
    let find = array.indexOf(value);

    if (find >= 0) {
      array.splice(find, 1);
    } else {
      array.push(value);
    }

    setInputs({
      ...inputs,
      [name]: array,
    });
    setErrors(
      validate({
        ...inputs,
        [name]: array,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(createRecipe(inputs));
      setInputs({
        name: "",
        summary: "",
        healthScore: 0,
        diets: [],
        dishTypes: [],
        instructions: [],
      });
      setErrors({
        name: "",
        summary: "",
        healthScore: "",
        diets: "",
        dishTypes: "",
        instructions: "",
      });
      dispatch(getRecipes());
      history.push("/home");
    } else {
      console.log(Object.keys(errors));
      alert("El formulario no se puede enviar con errores!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          <h1>Create your own recipe</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.name} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.nameInput}
            type="text"
            name="name"
            onChange={handleChange}
          />
          {errors.name? (<p>{errors.name}</p>): null}

          <label className={styles.summary} htmlFor="summary">
            Summary:
          </label>
          <textarea
            className={styles.summaryInput}
            name="summary"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          {errors.summary? (<p>{errors.summary}</p>): null}

          <label className={styles.healthScore} htmlFor="healthScore">
            Health Score:
          </label>
          <input
            className={styles.healthScoreInput}
            type="number"
            name="healthScore"
            onChange={handleChange}
          />
          {errors.healthScore? (<p>{errors.healthScore}</p>): null}

          <div className={styles.multiselect}>
            <div
              className={styles.selectBox}
              onClick={() => showCheckboxes("diets")}
            >
              <select>
                <option>Select diets</option>
              </select>
              <div className={styles.overSelect}></div>
            </div>
            <div
              style={{ display: expanded.diets ? "block" : "none" }}
              className={styles.checkboxes}
            >
              {diets.map((diet) => (
                <label key={diet.id} htmlFor={diet.name}>
                  <input
                    value={diet.id}
                    type="checkbox"
                    id={diet.name}
                    onChange={(e) => handleCheckbox(e, "diets")}
                  />
                  {diet.name}
                </label>
              ))}
            </div>
          </div>
          {errors.diets? (<p>{errors.diets}</p>): null}

          <div className={styles.multiselect}>
            <div
              className={styles.selectBox}
              onClick={() => showCheckboxes("dishes")}
            >
              <select>
                <option>Select dishes</option>
              </select>
              <div className={styles.overSelect}></div>
            </div>
            <div
              style={{ display: expanded.dishes ? "block" : "none" }}
              className={styles.checkboxes}
            >
              {dishes.map((dish) => (
                <label key={dish} htmlFor={dish}>
                  <input
                    value={dish}
                    type="checkbox"
                    id={dish}
                    onChange={(e) => handleCheckbox(e, "dishTypes")}
                  />
                  {dish}
                </label>
              ))}
            </div>
          </div>
          {errors.dishTypes? (<p>{errors.dishTypes}</p>): null}

          <div className={styles.instructions}>
            <label htmlFor="instructions">Instructions:</label>
            <button type="button" onClick={addInstruction}>
              Add
            </button>
            {instructions.map((instruction) => (
              <div className={styles.textArea}>
                <textarea
                  key={instruction.id}
                  onChange={(e) => handleInstructions(e, instruction.id)}
                />
              </div>
            ))}
          </div>
          {errors.instructions? (<p>{errors.instructions}</p>): null}

          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
