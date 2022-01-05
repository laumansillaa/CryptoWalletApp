const express = require('express');
const getRecipes = require('./getRecipes.js');
const getRecipeDetail = require('./getRecipeDetail.js');
const postRecipe = require('./postRecipe.js');

// ----
const router = express.Router();

router.get('/', getRecipes);
router.get('/detail/:id', getRecipeDetail);
router.post('/create', postRecipe);

module.exports = router;


