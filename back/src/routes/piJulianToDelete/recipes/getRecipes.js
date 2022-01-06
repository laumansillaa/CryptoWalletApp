require('dotenv').config();
const {
  API_KEY
} = process.env;

// ----
const axios = require('axios').default;
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../../db.js').models;

// ----
module.exports = async function getRecipes(req, res, next) {
  const query = req.query.title !== null && req.query.title.toLowerCase();
  const defaultRecipes = req.query.defaultRecipes;

  try {
    if (defaultRecipes === 'true') {
      const dbResponse = await Recipe.findAll({
        order: [['id', 'ASC']],
        limit: 100,
        attributes: ['id', 'title', 'image', 'score'],
        include: { 
          model: Diet,
          as: 'diets',
          attributes: ['name'],
          through: { attributes: [] }
        }
      });

      const dbRecipes = dbResponse.map(recipe => ({
        ...recipe.dataValues,
        diets: recipe.dataValues.diets.map(diet => diet.name)
      }));

      res.send(dbRecipes);
    }

    else {
      if (process.env.NODE_ENV === 'production') {
        const dbResponse = await Recipe.findAll({
              attributes: ['id', 'title', 'image', 'score'],
              include: { 
                model: Diet,
                as: 'diets',
                attributes: ['name'],
                through: { attributes: [] }
              },
              where: {
                title: {
                  [Op.iLike]: `%${query}%`
                } 
              },
            });

        const dbRecipes = dbResponse.map(recipe => ({
          ...recipe.dataValues,
          diets: recipe.dataValues.diets.map(diet => diet.name)
        }));

        res.send(dbRecipes);
      }

      else {
        const dbPromise = Recipe.findAll({
          attributes: ['id', 'title', 'image', 'score'],
          include: { 
            model: Diet,
            as: 'diets',
            attributes: ['name'],
            through: { attributes: [] }
          },
          where: {
            title: {
              [Op.iLike]: `%${query}%`
            } 
          },
        });

        const apiPromise= axios .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${query}&number=100`);

        const [dbResponse, apiResponse ] = await Promise.all([dbPromise, apiPromise]);

        const dbRecipes = dbResponse.map(recipe => ({
          ...recipe.dataValues,
          diets: recipe.dataValues.diets.map(diet => diet.name)
        }));

        const apiRecipes = apiResponse.data.results.map(recipe => {
          const { title, image, diets, spoonacularScore } = recipe;
          recipe.vegetarian && !diets.includes('vegetarian') && diets.push('vegetarian')
          recipe.vegan && !diets.includes('vegan') && diets.push('vegan')
          recipe.glutenFree && !diets.includes('gluten free') && diets.push('gluten free')
          recipe.dairyFree && !diets.includes('dairy free') && diets.push('dairy free');

          return {
            id: 'EXTERNAL_' + recipe.id,
            title,
            image,
            diets,
            score: spoonacularScore / 20,
          }
        });

        res.send([...dbRecipes, ...apiRecipes]);
      }
    }
  } 

  catch (error) { next(error) }
};
