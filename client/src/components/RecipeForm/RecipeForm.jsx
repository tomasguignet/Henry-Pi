import { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../redux/actions";

export default function RecipeForm() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.data.diets);

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

  const validate = ({
    name,
    summary,
    healthScore,
    diets,
    dishTypes,
    instructions,
  }) => {
    const errors = {};

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

  const [instructions, setInstructions] = useState([]);

  const addInstruction = (event) => {
    setInstructions([
      ...instructions,
      {
        id: instructions.at(-1) ? instructions.at(-1).id + 1 : 0,
        text: "",
      },
    ]);
  };

  const handleInstructions = (event, id) => {
    let instructionState = instructions[id];
    let newArray = [];

    instructionState.text = event.target.value;
    if (newArray[id]) {
      newArray[id] = event.target.value;
    } else {
      newArray.push(event.target.value);
    }

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

  const handleCheckbox = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);

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
      dispatch(createRecipe(inputs));
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

        <label htmlFor="diets">Diets:</label>
        <select name="diets" id="diets" multiple>
          {diets.map((diet) => (
            <option
              key={diet}
              selected={inputs.diets.includes(diet)}
              onChange={handleCheckbox}
              value={diet.name}
            >
              {diet.name}
            </option>
          ))}
        </select>

        <label htmlFor="dishTypes">Dish Types:</label>
        <select name="dishTypes" id="dishTypes" multiple>
          {dishes.map((dish) => (
            <option
              key={dish}
              selected={inputs.dishTypes.includes(dish)}
              onChange={handleCheckbox}
              value={dish}
            >
              {dish}
            </option>
          ))}
        </select>

        <div className="instructions-form">
          <label htmlFor="instructions">Instructions:</label>
          {instructions.map((instruction) => (
            <textarea
              key={instruction.id}
              onChange={() => handleInstructions(instruction.id)}
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
