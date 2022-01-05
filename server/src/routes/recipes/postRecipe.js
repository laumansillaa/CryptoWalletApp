const { Op } = require('sequelize');
const { Recipe, Diet } = require('../../db.js').models;

module.exports = async function postRecipe(req, res, next)  {
  const { title, image, diets = [], summary, score, healthScore, instructions = [] } = req.body;

  if (!title || !summary || typeof Number(score) !== 'number' || typeof Number(healthScore) !== 'number' ||
    !Array.isArray(diets) || !Array.isArray(instructions)) return res.status(400).send('Invalid values.')

  try {
    const newRecipePromise = Recipe.create({
      title,
      image,
      summary,
      score: Number(score),
      healthScore: Number(healthScore),
      instructions,
    });

    const matchedDietsPromise = Diet.findAll({
      where: {
        name: {
          [Op.in]: diets
        } 
      },
    });

    const [newRecipe, matchedDiets] = await Promise.all([newRecipePromise, matchedDietsPromise]);

    newRecipe.setDiets(matchedDiets);

    res.send({ id: newRecipe.dataValues.id });
  } 

  catch (error) { next(error) }
};
