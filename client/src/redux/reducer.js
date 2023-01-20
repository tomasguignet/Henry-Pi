import { UPLOAD_RECIPES, UPLOAD_RECIPE, UPLOAD_DIETS } from "./actions";

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
    case UPLOAD_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case UPLOAD_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case UPLOAD_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
