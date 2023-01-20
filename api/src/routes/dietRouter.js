const { Router } = require("express");
const {
  getDietsFromDB,
  preChargeDietsInDB,
  createDiet,
} = require("../controllers/dietControllers");

const dietRouter = Router();

/* dietRouter.get("/preCharge", async (req, res) => {
  try {
    await preChargeDietsInDB();
    res.status(200).send("Dietas cargadas");
  } catch (error) {
    res.status(400).send(error.message);
  }
}); */

dietRouter.get("/", async (req, res) => {
  try {
    const diets = await getDietsFromDB();
    res.status(200).send(diets);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

dietRouter.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newDiet = await createDiet(name);
    res.status(200).send("Se cargo la dieta");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = dietRouter;
