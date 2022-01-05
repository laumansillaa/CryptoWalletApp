const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  sequelize.define('Diet', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false, 
    },
  });
};
