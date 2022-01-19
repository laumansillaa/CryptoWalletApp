module.exports = function(sequelize) {
    // Connections.
    require("./User.js")(sequelize);
    require("./Key.js")(sequelize);
    require("./Operation.js")(sequelize);
    require("./Contact.js")(sequelize);

    // Associations.
    const { User, Operation, Key, Contact } = sequelize.models;
    Operation.belongsToMany(User, {as: "users", through: "UserOperation", foreignKey: "operationId"});
    User.belongsToMany(Operation, { as: "operations", through: "UserOperation", foreignKey: "userId"});
    User.hasOne(Key, {foreignKey: "userId"});
    User.hasMany(Contact, {foreignKey: "userId"});
}
