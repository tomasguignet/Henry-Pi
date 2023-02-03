const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getDietsFromApi() {
  let diets = [];
  //Traemos los resultados de la API
  const results = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&&number=100`);
  //De los resultados analizamos si en el array "diets" existe cierta dieta y si no existe la pusheamos
  results.data.results.forEach((result) => {
    result.diets.forEach((diet) => {
      if (!diets.includes(diet)) {
        diets.push(diet);
      }
    });
  });
  return diets;
}

async function getDietsFromDB() {
  const diets = await Diet.findAll();
/*   const diets = await preChargeDietsInDB(); */
  return diets;
}

async function preChargeDietsInDB() {
  /* const diets = await getDietsFromApi(); */
  const diets = [
    "Gluten free",
    "Dairy free",
    "Ketogenic",
    "Lacto ovo vegetarian",
    "Lacto vegetarian",
    "Ovo vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole 30",
  ];
  for (const diet of diets) {
    Diet.findOrCreate({where: { name: diet }});
  }
}

async function createDiet(name) {
  const newDiet = await Diet.create({ name });
  return newDiet;
}

module.exports = {
  getDietsFromDB,
  preChargeDietsInDB,
  createDiet,
};
