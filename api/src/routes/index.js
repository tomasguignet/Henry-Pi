const { Router } = require('express');
const recipeRouter = require("./recipeRouter");
const dietRouter = require("./dietRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipeRouter);
router.use("/diets", dietRouter);
router.get("*", (req , res) => {
    res.status(404).send("No hay nada por aca");
})

module.exports = router;
