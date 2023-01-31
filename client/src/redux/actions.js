import axios from "axios";
//Definimos los tipos de acciones que afectan al estado global
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES = "GET_RECIPES";
export const GET_DIET = "GET_DIET";
export const GET_RECIPE = "GET_RECIPE";
export const CLEAN_RECIPE = "CLEAN_RECIPE";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const CREATE_DIET = "CREATE_DIET";
export const SET_LOADING = "SET_LOADING";

//Definimos las acciones con su tipo
export const getDiets = () => {
  return async function (dispatch) {
    /* await axios.get("https://http://localhost:3001/diets/preCharge"); */
    try {
      const data = await axios.get("/diets")
      dispatch({ type: GET_DIETS, payload: data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipes = () => {
  return async function (dispatch) {
    try {
      const data = await axios.get("/recipes")
      dispatch({ type: GET_RECIPES, payload: data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipe = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/recipes/${id}`);
      return dispatch({ type: GET_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createRecipe = (recipe) => {
  return async function (dispatch) {
    try {
      const data = await axios.post(
        "/recipes",
        recipe
      );
      alert("Receta creada con exito!")
      return dispatch({ type: CREATE_RECIPE, payload: data.data });
    } catch (error) {
      alert(error.response.data)
    }
  };
};

export const createDiet = (diet) => {
  return async function (dispatch) {
    try {
      const data = await axios.post("/diets", diet);
      return dispatch({ type: CREATE_DIET, payload: data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipesByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/recipes?name=${name}`
      );
      return dispatch({ type: GET_RECIPES_BY_NAME, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterByDiets = (diets) => {
  return async function (dispatch) {
    try {
      return dispatch({ type: FILTER_BY_DIETS, payload: diets });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const orderByScore = (asc) => {
  return async function (dispatch) {
    try {
      return dispatch({ type: ORDER_BY_SCORE, payload: asc });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const orderAlphabetically = (asc) => {
  return async function (dispatch) {
    try {
      return dispatch({ type: ORDER_ALPHABETICALLY, payload: asc });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const loading = (boolean) => {
  return { type: SET_LOADING, payload: boolean };
}

export const cleanRecipe = () => {
  return function (dispatch) {
    return dispatch({ type: CLEAN_RECIPE });
  }
};
