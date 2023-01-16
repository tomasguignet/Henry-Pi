const { Router } = require("express");
const { Recipe } = require("../db");
const {
  getRecipes,
  getRecipe,
  createRecipe,
} = require("../controllers/recipeControllers");

const recipeRouter = Router();

recipeRouter.get("/", (req, res) => {});

recipeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipe(id);
    res.status(200).json(recipe);
  } catch (error) {
/*     if (recipe) return res.status(404).send("No existe la receta"); */
    res.status(404).send(error.message);
  }
});

recipeRouter.post("/", async(req, res) => {
  const { name, summary, healthScore, instructions, image } = req.body;
  try {
    const newRecipe = await createRecipe(
      name,
      summary,
      healthScore,
      instructions,
      image
    );
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = recipeRouter;
