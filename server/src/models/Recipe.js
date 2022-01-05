const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');

let storedRecipes = 0;

module.exports = function(sequelize) {
  sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.REAL,
    },
    healthScore: {
      type: DataTypes.REAL,
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  }, {
    hooks: {
      beforeCreate: function(recipe, options) {
        if (storedRecipes >= 145) {
          sequelize.models.Recipe.destroy({
            where: {
              id: {
                [Op.gt]: 100
              }
            }
          })
          storedRecipes = 100;
        }
        storedRecipes++;
      }
    }
  });
};
