const express = require('express');
const { Diet } = require('../../db.js').models;

// ----
const router = express.Router();

router.get('/', async (req, res, next) => {
  try { 
    const response = await Diet.findAll();
    const diets = response.map(diet => diet.dataValues.name);
    res.send(diets);
  } catch(error) { next(error) }
})

module.exports = router;
