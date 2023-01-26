import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../redux/actions";

export default function RecipeForm() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [index, setIndex] = useState(0);

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
    image: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    healthScore: "",
    diets: "",
    dishTypes: "",
    instructions: "",
    image: ""
  });

  const [dietss, setDietss] = useState({});

  const validate = ({
    name,
    summary,
    healthScore,
    diets,
    dishTypes,
    instructions
  }) => {
    const errors = {};

    errors.name = !name ? "Se requiere un nombre" : errors.name;
    errors.summary = !summary ? "Se requiere un resumen de la receta" : errors.summary;
    errors.healthScore = healthScore < 0 ? "La puntuacion no puede ser negativa" : errors.healthScore;
    if (!diets.length) errors.diets = "Tiene que tener al menos una dieta";
    if (!dishTypes.length) errors.dishTypes = "Tiene que tener al menos un tipo de plato";
    if (instructions.length > 0) {
      for (const i of instructions) {
        if (!i.length) errors.instructions = "No puede haber una instruccion vacia";
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

  const handleCheckbox = (event, key) => {
    let array = inputs.instructions;
    if (array[key]) {
      array[key] = event.target.value;
    } else {
      array.push(event.target.value)
    }
    
    setInputs({
      ...inputs,
      instructions: array
    });
    setErrors(
      validate({
        ...inputs,
        instructions: array
      })
    )
  }

  const addInstruction = (event) => {
    const instructionsLabel = document.getElementsByClassName("instructionsInputs");
    if (!instructionsLabel.lastElementChild.value) { alert("Debes completar la instruccion anterior primero!") }
    else {
      const newInput = document.createElement("textarea");
      newInput.setAttribute("name", "instructions");
      newInput.setAttribute("key", index);
      setIndex(index + 1);
      newInput.onchange = (event, key) => { handleCheckbox() }

      instructionsLabel.appendChild(newInput);

    }
  }


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
        image: ""
      });
      setErrors({
        name: "",
        summary: "",
        healthScore: "",
        diets: "",
        dishTypes: "",
        instructions: "",
        image: ""
      })
      alert("Receta creada con exito!");
      //history
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
        <textarea name="summary" cols="30" rows="10" onChange={handleChange}></textarea>

        <label htmlFor="healthScore">Health Score:</label>
        <input type="number" name="healthScore" onChange={handleChange} />

        <label htmlFor="diets">Diets:</label>
        <select name="diets" id="diets" multiple="multiple" onChange={handleChange}>
          {diets.map((diet) => (
            <option value={diet.name}>{diet.name}</option>
          ))}
        </select>

        <label htmlFor="dishTypes">Dish Types:</label>
        <select name="dishTypes" id="dishTypes" onChange={handleChange}>
          {dishes.map((dish) => (
            <option value={dish}>{dish}</option>
          ))}
        </select>

        <div className="instructions-form">
          <label htmlFor="instructions">Instructions:</label>
          <div className="instructionsInputs">

          </div>
          <button type="button" onClick={addInstruction}>Add</button>
        </div>

        <label htmlFor="image">Image:</label>
        <input type="file" name="image" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
