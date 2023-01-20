import axios from "axios"
//Definimos los tipos de acciones que afectan al estado global
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES = "GET_RECIPES";
export const GET_DIET = "GET_DIET";
export const GET_RECIPE = "GET_RECIPE";
export const CLEAN_RECIPE = "CLEAN_RECIPE";

//Definimos las acciones con su tipo
export const getDiets = () => {
  return function (dispatch) {
    axios
      .get("https://http://localhost:3001/diets")
      .then((data) => dispatch({ type: GET_DIETS, payload: data.data }))
      .catch((error) => console.log(error.message));
  };
};

export const getRecipes = () => {
  return function (dispatch) {
    axios
      .get("https://http://localhost:3001/recipes")
      .then((data) => dispatch({ type: GET_RECIPES, payload: data.data }))
      .catch((error) => console.log(error.message));
  };
};

export const getRecipe = (id) => {
  return function (dispatch) {
    try {
      const response = axios.get(`https://http://localhost:3001/recipes/${id}`);
      return dispatch({ type: GET_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createRecipe = (recipe) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "https://http://localhost:3001/recipes",
        recipe
      );
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createDiet = (diet) => {
  return async function (dispatch) {
    const response = await axios.post(
      "https://http://localhost:3001/diets",
      diet
    );
    return response;
  };
};

export const cleanRecipe = () => {
  return { type: CLEAN_RECIPE };
};
