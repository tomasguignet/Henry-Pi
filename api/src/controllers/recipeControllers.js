const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

//Creamos las funciones para traer las recetas de la API
async function getRecipesFromApi(name) {
    let recipes = [];
    //Traemos los resultados de la API
    const results = await axios.get(/* `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&&number=100` */"https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5");

    //Vemos si llego una query en el path
    if (name) {
        //Si llego una query buscamos resultados que coincidan con la misma
        results.data.results.forEach((result, i) => {
            let title = result.title.toLowerCase();
            let name1 = name.toLowerCase();
            if (title.includes(name1)) {
                recipes.push(result)
            };
        })
    } else {
        //Sino traemos 100 resultados
        results.data.results.forEach((result, i) => {
            if (i <= 100) recipes.push(result);
        })
    }
    //Mapeamos el array de recetas solo con la informacion que queremos
    recipes = recipes.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            diets: recipe.diets.map(diet => (diet.charAt(0).toUpperCase() + diet.slice(1))),
            dishTypes: recipe.dishTypes,
            instructions: recipe.analyzedInstructions[0]?.steps.map(step => {
                return step.step;
            }),
            image: recipe.image
        }
    })
    return recipes;
}
async function getRecipeFromApi(id) {
    const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    const recipe = {
        id: result.data.id,
        name: result.data.title,
        summary: result.data.summary,
        healthScore: result.data.healthScore,
        diets: result.data.diets.map(diet => (diet.charAt(0).toUpperCase() + diet.slice(1))),
        dishTypes: result.data.dishTypes,
        instructions: result.data.analyzedInstructions[0]?.steps.map(step => {
            return step.step;
        }),
        image: result.data.image
    }
    return recipe;
}

//Creamos las funciones para traer las recetas de la base de datos
async function getRecipesFromDB(name) {
    if (name) {
        const result = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        var recipes = result.filter(recipe => {
            return recipe.name.toLowerCase().includes(name.toLowerCase());
        })
    } else {
        var recipes = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
    }
    const recipes1 = recipes.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.name,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            diets: recipe.diets.map(diet => diet.name),
            dishTypes: recipe.dishTypes,
            instructions: recipe.instructions,
            image: recipe.image
        }
    })
    return recipes1;
}
async function getRecipeFromDB(id) {
    const recipe = await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
    const recipe1 = {
        id: recipe.id,
        name: recipe.name,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diets.map(diet => diet.name),
        dishTypes: recipe.dishTypes,
        instructions: recipe.instructions,
        image: recipe.image
    }
    return recipe1;
}

//Juntamos resultados de la API y la Base de datos
async function getRecipes(name) {
    const recipesFromDB = await getRecipesFromDB(name);
    const recipesFromApi = await getRecipesFromApi(name);

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
async function createRecipe(name, summary, healthScore, dishTypes, instructions, diets) {
    console.log({ name, summary, healthScore, dishTypes, instructions });
    const newRecipe = await Recipe.create({ name, summary, healthScore, dishTypes, instructions });
    console.log(newRecipe);
    await newRecipe.addDiet(diets);
    return newRecipe;
}

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe
}