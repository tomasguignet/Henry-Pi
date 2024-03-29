import {
  GET_RECIPES,
  GET_RECIPE,
  GET_DIETS,
  GET_RECIPES_BY_NAME,
  FILTER_BY_DIETS,
  ORDER_ALPHABETICALLY,
  ORDER_BY_SCORE,
  CREATE_RECIPE,
  CREATE_DIET,
  CLEAN_RECIPE,
  SET_LOADING
} from "../actions";

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
      if (action.payload.length) {
        return {
          ...state,
          currentRecipes: state.allRecipes.filter((recipe) => {
            for (const diet of action.payload) {
              if (recipe.diets.includes(diet)) return true;
            }
          }),
        };
      } else {
        return {
          ...state,
          currentRecipes: state.allRecipes
        };
      };
    case ORDER_ALPHABETICALLY:
      const recipesAlphabetically = action.payload
        ? state.currentRecipes.sort((a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        })
        : state.currentRecipes.sort((a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          if (a < b) return 1;
          if (a > b) return -1;
          return 0;
        });
      return {
        ...state,
        currentRecipes: recipesAlphabetically.slice(0),
      };
    case ORDER_BY_SCORE:
      const recipesByScore = action.payload
        ? state.currentRecipes.sort((a, b) => {
/*           console.log(typeof a.healthScore);
          console.log(a);
          console.log(typeof b.healthScore);
          console.log(b); */
          if (a.healthScore > b.healthScore) return 1;
          if (a.healthScore < b.healthScore) return -1;
          return 0;
        })
        : state.currentRecipes.sort((a, b) => {
/*           console.log(typeof a.healthScore);
          console.log(a);
          console.log(typeof b.healthScore);
          console.log(b); */
          if (a.healthScore < b.healthScore) return 1;
          if (a.healthScore > b.healthScore) return -1;
          return 0;
        });
      return {
        ...state,
        currentRecipes: recipesByScore.slice(0),
      };

    case CREATE_RECIPE:
      const newRecipes = state.allRecipes;
      newRecipes.push(action.payload);
      return {
        ...state,
        allRecipes: newRecipes,
        currentRecipes: newRecipes
      };
    case CREATE_DIET:
      const newDiets = state.diets;
      newDiets.push(action.payload);
      return {
        ...state,
        diets: newDiets
      };
    case CLEAN_RECIPE:
      return {
        ...state,
        recipe: {},
      };

    default:
      return { ...state };
  }
};


export default reducer;
