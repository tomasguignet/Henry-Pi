const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getDietsFromApi() {
  let diets = [];
  //Traemos los resultados de la API
  const results = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
  );
  //De los resultados analizamos si en el array "diets" existe cierta dieta y si no existe la pusheamos
  results.data.results.forEach((result) => {
    for (let i = 0; i < result.diets; i++) {
      if (!diets.includes(result.diets[i])) {
        diets.push(result.diets[i]);
      }
    }
  });
  return diets;
}

async function getDietsFromDB() {
  const diets = await Diet.findAll();
  return diets;
}

async function preChargeDietsInDB() {
  const diets = await getDietsFromApi();
/*   const diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30"
  ] */
  for (const diet of diets) {
    Diet.create({ name: diet });
  }
}

async function createDiet(name) {
    const newDiet = await Diet.create({name});
    return newDiet;
}

module.exports = {
    getDietsFromDB ,
    preChargeDietsInDB ,
    createDiet
};
