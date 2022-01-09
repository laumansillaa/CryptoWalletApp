require ('dotenv').config();
const fs = require ('fs');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;


// Initialize data base.
const { Sequelize } = require('sequelize');
const sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize({
      database: DB_NAME,
      dialect: "postgres",
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          // Ref: https://github.com/brianc/node-postgres/issues/2009.
          rejectUnauthorized: false,
        },
        keepAlive: true,
      },
      ssl: true,
      define: { timestamps: false }
    })
  : new Sequelize( `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { 
      logging: false,
      native: false,
      define: { timestamps: false }
    });


// Connect models to sequelize.
// const RecipeModelCreator = require('./models/Recipe.js')
// const DietModelCreator = require('./models/Diet')
// RecipeModelCreator(sequelize);
// DietModelCreator(sequelize);
const UserModel = require ('./models/User.js')
UserModel(sequelize);
const Transaction = require ('./models/Transaction.js')
Transaction(sequelize);
const AccountMovement = require ('./models/AccountMovements.js')
AccountMovement(sequelize);


const {User} = sequelize.models




// Associations.
// const { Recipe, Diet } = sequelize.models;
// Recipe.belongsToMany(Diet, {as: 'diets', through: 'RecipesDiets', foreignKey: 'recipeId'});
// Diet.belongsToMany(Recipe, {as: 'recipes', through: 'RecipesDiets', foreignKey: 'dietId'});

module.exports = sequelize;
