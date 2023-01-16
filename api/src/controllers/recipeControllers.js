const {Recipe} = require("../db");
const axios = require("axios");
const {API_KEY} = process.env;

//Creamos las funciones para traer las recetas de la API
async function getRecipesFromApi() {
    let recipes = [];
    const results = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`);
    results.results.forEach(result => {
        if (result.id <= 100) recipes.push(result); 
    })
    return recipes;
}
async function getRecipeFromApi(id) {
    const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    return recipe.data;
}

//Creamos las funciones para traer las recetas de la base de datos
async function getRecipesFromDB() {
    const recipes = await Recipe.findAll();
    return recipes;
}
async function getRecipeFromDB(id) {
    const recipe = await Recipe.findByPk(id);
    return recipe;
}

//Juntamos resultados de la API y la Base de datos
async function getRecipes() {
    const recipesFromDB = await getRecipesFromDB();
    const recipesFromApi = await getRecipesFromApi();

    const recipes = [...recipesFromApi, ...recipesFromDB];
    if (!recipes.length) throw Error("No se encontraron recetas");
    return recipes;
}
async function getRecipe(id) {
    if (id.length <= 5) {
        var recipe = await getRecipeFromApi(id)
    } else {
        var recipe = await getRecipeFromDB(id);
    }
    return recipe;
}

//Creamos la funcion para registrar una nueva receta
async function createRecipe(name , summary , healthScore , instructions , image) {
    const newRecipe = await Recipe.create({name , summary , healthScore , instructions , image});
    return newRecipe;
}

module.exports = {
    getRecipes ,
    getRecipe ,
    createRecipe
}