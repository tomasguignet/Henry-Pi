import { useState } from "react";
import { useSelector } from "react-redux";

export default function RecipeForm() {
  const diets = useSelector((state) => state.diets);

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

  const [dietss, setDietss] = useState({});

  const validate = ({
    name,
    summary,
    healthScore,
    diets,
    instructions,
    image,
  }) => {
    const errors = {};

    errors.name = !name ? "Se requiere un nombre" : errors.name;
    errors.summary = !summary ? "Se requiere un resumen de la receta" : errors.summary;
    errors.healthScore = healthScore<0 ? "La puntuacion no puede ser negativa" : errors.healthScore;
    if (instructions.length>0) {
/*         for (const i of instructions) {
            errors.instructions = cv
        } */
    }
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
    } else {
      alert("El formulario no se puede enviar con errores!");
    }
  };

  const addInstruction = (event) => {
    
  }

  return (
    <div>
      <div>
        <h1>Create your own recipe</h1>
      </div>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={handleChange}/>

        <label htmlFor="summary">Summary:</label>
        <textarea name="summary" cols="30" rows="10" onChange={handleChange}></textarea>

        <label htmlFor="healthScore">Health Score:</label>
        <input type="number" name="healthScore" onChange={handleChange}/>

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
          <button type="button" onClick={"................."}>Add</button>
        </div>

        <label htmlFor="image">Image:</label>
        <input type="file" name="image" onChange={handleChange}/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
