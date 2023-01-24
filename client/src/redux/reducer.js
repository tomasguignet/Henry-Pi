import {
  GET_RECIPES,
  GET_RECIPE,
  GET_DIETS,
  GET_RECIPES_BY_NAME,
  FILTER_BY_DIETS,
  ORDER_ALPHABETICALLY,
  ORDER_BY_SCORE,
  CLEAN_RECIPE,
} from "./actions";

//Definimos los estados que usaremos en muchas partes de la api
const initialState = {
  allRecipes: [],
  recipe: {},
  diets: [],
  currentRecipes: [],
};

//Definimos el reducer donde se setearan las acciones disponibles para cambiar el estado
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        currentRecipes: action.payload,
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
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        currentRecipes: action.payload,
      };
    case FILTER_BY_DIETS:  
    return {
        ...state,
        currentRecipes: allRecipes.filter((recipe) => recipe.diets.includes(action.payload))
        //REVISAR EL BIEN COMO LLEGAN LAS DIETAS DE LA DB Y LA ACTION
      };

    default:
      return { ...state };
  }
};

export default reducer;
