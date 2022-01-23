module.exports = function(sequelize) {
    require("./User.js")(sequelize);
    require("./Key.js")(sequelize);
    require("./Operation.js")(sequelize);
    require("./Contact.js")(sequelize);
    require("./SecurityToken.js")(sequelize);
    require("./Staking.js")(sequelize);
    require("./PaymentRequest.js")(sequelize)

    // Associations.
    const { User, Operation, Key, Contact, SecurityToken, Staking, PaymentRequest } = sequelize.models;
    Operation.belongsToMany(User, {as: "users", through: "UserOperation", foreignKey: "operationId"});
    User.belongsToMany(Operation, { as: "operations", through: "UserOperation", foreignKey: "userId"});
    User.hasMany(Contact, { foreignKey: "userId" });
    User.hasMany(Staking, { foreignKey: "userId"});
    User.hasOne(Key, {foreignKey: "userId"});
    User.hasOne(SecurityToken, {foreignKey: "userId"});
    User.hasOne(PaymentRequest, {foreignKey: "userId"});
};
