const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// Initialize data base.
const { Sequelize } = require("sequelize");
const sequelize = process.env.NODE_ENV === "production"
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
      native: false
    });


// Connect models to sequelize.
require('./models')(sequelize)

// Associations.
// const { User, Operation, Key, RecoveryToken } = sequelize.models;
// Operation.belongsToMany(User, {as: 'users', through: 'UserOperation', foreignKey: 'operationId'});
// User.belongsToMany(Operation, { as: 'operations', through: 'UserOperation', foreignKey: 'userId'})
// User.hasOne(Key, {as: 'key', foreignKey: 'user'})
// User.hasOne(RecoveryToken)


// Connection and association of data base models.
//require("./models")(sequelize)


module.exports = sequelize;
