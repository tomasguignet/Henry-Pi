const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

//Creamos las funciones para traer las recetas de la API
async function getRecipesFromApi(name) {
    let recipes = [];
    const results = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    if (name) {
        results.data.results.forEach((result, i) => {
            if (result.name === name) recipes.push(result);
        })
    } else {
        results.data.results.forEach((result, i) => {
            if (i <= 100) recipes.push(result);
        })
    }
    recipes = recipes.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            instructions: recipe.analyzedInstructions[0]?.steps.map(step => {
                return step.step;
            }),
            image: recipe.image
        }
    })
    console.log(recipes);
    return recipes;
}
async function getRecipeFromApi(id) {
    const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    const recipe = {
        id: result.data.id,
        name: result.data.title,
        summary: result.data.summary,
        healthScore: result.data.healthScore,
        instructions: result.data.analyzedInstructions[0].steps.map(step => {
            return step.step;
        }),
        image: result.data.image
    }
    return recipe;
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
    /* if (!recipes.length) throw Error("No se encontraron recetas"); */
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
async function createRecipe(name, summary, healthScore, instructions, image) {
    const newRecipe = await Recipe.create({ name, summary, healthScore, instructions, image });
    return newRecipe;
}

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe
}