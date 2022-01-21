module.exports = function(sequelize) {

    require("./User.js")(sequelize);
    require("./Key.js")(sequelize);
    require("./Operation.js")(sequelize);
    require("./Contact.js")(sequelize);
    require("./SegurityToken")(sequelize);
    require("./Staking")(sequelize);

    // Associations.
    const { User, Operation, Key, Contact, SegurityToken, Staking } = sequelize.models;
    Operation.belongsToMany(User, {as: "users", through: "UserOperation", foreignKey: "operationId"});
    User.belongsToMany(Operation, { as: "operations", through: "UserOperation", foreignKey: "userId"});
    User.hasOne(Key, {foreignKey: "userId"});
    User.hasMany(Contact, {foreignKey: "userId"});
    User.hasOne(SegurityToken, {through: "SegurityTokenUser"});
    Staking.belongsToMany(User, {as: "users", through: "UserStaking", foreignKey: "stakingId"});
    User.belongsToMany(Staking, { as: "stakings", through: "UserStaking", foreignKey: "userId"});
}
