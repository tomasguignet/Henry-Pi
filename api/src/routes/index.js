const { Router } = require('express');
const recipeRouter = require("./recipeRouter");
const dietRouter = require("./dietRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/recipes", recipeRouter);
router.use("/diets", dietRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
