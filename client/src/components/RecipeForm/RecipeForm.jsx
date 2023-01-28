import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../redux/actions";
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
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    healthScore: "",
    diets: "",
    dishTypes: "",
    instructions: "",
    image: "",
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
    console.log("instructions " + instructions);
    console.log("diets" + diets);
    console.log("dishes " + dishTypes);

    errors.name = !name ? "Se requiere un nombre" : errors.name;
    errors.summary = !summary
      ? "Se requiere un resumen de la receta"
      : errors.summary;
    errors.healthScore =
      healthScore < 0
        ? "La puntuacion no puede ser negativa"
        : errors.healthScore;
    if (!diets.length) errors.diets = "Tiene que tener al menos una dieta";
    if (!dishTypes.length)
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

    setInstructions([...instructions, instructions[id].text = text]);

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
      array.slice(find, 1);
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
      /* dispatch(createRecipe(inputs)); */
      console.log(inputs);
      setInputs({
        name: "",
        summary: "",
        healthScore: 0,
        diets: [],
        dishTypes: [],
        instructions: [],
        image: "",
      });
      setErrors({
        name: "",
        summary: "",
        healthScore: "",
        diets: "",
        dishTypes: "",
        instructions: "",
        image: "",
      });
      alert("Receta creada con exito!");
      /* history.push("/home"); */
    } else {
      alert("El formulario no se puede enviar con errores!");
    }
  };

  return (
    <div>
      <div>
        <h1>Create your own recipe</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={handleChange} />

        <label htmlFor="summary">Summary:</label>
        <textarea
          name="summary"
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="healthScore">Health Score:</label>
        <input type="number" name="healthScore" onChange={handleChange} />

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
              <label htmlFor={diet.name}>
                <input
                  value={diet.name}
                  type="checkbox"
                  id={diet.name}
                  onChange={(e) => handleCheckbox(e, "diets")}
                />
                {diet.name}
              </label>
            ))}
          </div>
        </div>

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
              <label htmlFor={dish}>
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

        <div className="instructions-form">
          <label htmlFor="instructions">Instructions:</label>
          {instructions.map((instruction) => (
            <textarea
              key={instruction.id}
              onChange={(e) => handleInstructions(e, instruction.id)}
            />
          ))}
          <button type="button" onClick={addInstruction}>
            Add
          </button>
        </div>

        <label htmlFor="image">Image:</label>
        <input type="file" name="image" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
