import { GET_RECIPES, GET_RECIPE, GET_DIETS } from "./actions";

//Definimos los estados que usaremos en muchas partes de la api
const initialState = {
  recipes: [],
  recipe: {},
  diets: [],
  diet: {},
};

//Definimos el reducer donde se setearan las acciones disponibles para cambiar el estado
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
