const { Op } = require('sequelize');
const db = require('../db.js');
const recipes = require('./recipesData');

module.exports = function recipesLoader() {
  return recipes.map(recipe => {
    const { title, image, diets = [], summary, score, healthScore, instructions = [] } = recipe;
    return new Promise(async (resolve, reject) => {
      try {
        const newRecipePromise = db.models.Recipe.create({
          title,
          image,
          summary: summary.replace(/<[^>]*>?/g, ''),
          score: Number(score),
          healthScore: Number(healthScore),
          instructions,
        });

        const matchedDietsPromise = db.models.Diet.findAll({
          where: {
            name: {
              [Op.in]: diets
            } 
          },
        });

        const [newRecipe, matchedDiets] = await Promise.all([newRecipePromise, matchedDietsPromise]);

        newRecipe.setDiets(matchedDiets);

        resolve([newRecipe, matchedDiets]);
      } 

      catch (error) { reject(error) }
    })
  })
};
