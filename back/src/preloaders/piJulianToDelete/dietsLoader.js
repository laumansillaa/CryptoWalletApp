const db = require('../db.js');
const diets = require('./dietsData');

module.exports = function dietsLoader() {
  return diets.map(diet => db.models.Diet.create({name: diet}))
};
