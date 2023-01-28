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
      axios
        .get("http://localhost:3001/diets")
        .then((data) => dispatch({ type: GET_DIETS, payload: data.data }));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipes = () => {
  return function (dispatch) {
    try {
      dispatch(loading(true));
      axios
        .get("http://localhost:3001/recipes")
        .then((data) => dispatch({ type: GET_RECIPES, payload: data.data })).then(response => dispatch(loading(false)));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipe = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({ type: GET_RECIPE, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createRecipe = (recipe) => {
  return async function (dispatch) {
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        recipe
      );
      return dispatch({ type: CREATE_RECIPE });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createDiet = (diet) => {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/diets", diet);
      return dispatch({ type: CREATE_DIET });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipesByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
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
  return {type: SET_LOADING , payload: boolean};
}

export const cleanRecipe = () => {
  return { type: CLEAN_RECIPE };
};
