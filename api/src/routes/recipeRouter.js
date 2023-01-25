const { Router } = require("express");
const { Recipe } = require("../db");
const {
  getRecipes,
  getRecipe,
  createRecipe,
} = require("../controllers/recipeControllers");

const recipeRouter = Router();

recipeRouter.get("/", async(req, res) => {
  const {name} = req.query;
  try {
    const recipes = await getRecipes(name);
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

recipeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await getRecipe(id);
    res.status(200).send(recipe);
  } catch (error) {
/*     if (recipe) return res.status(404).send("No existe la receta"); */
    res.status(400).send(error.message);
  }
});

recipeRouter.post("/", async(req, res) => {
  const { name, summary, healthScore, dishTypes, instructions, image, diets } = req.body;
  try {
    const newRecipe = await createRecipe(
      name,
      summary,
      healthScore,
      dishTypes,
      instructions,
      image,
      diets
    );
    res.status(200).send(newRecipe);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = recipeRouter;
