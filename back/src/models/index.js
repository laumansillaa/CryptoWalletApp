module.exports = function(sequelize) {
    require('./User.js')(sequelize);
    require('./Key.js')(sequelize);
    require('./Operation.js')(sequelize);
    // require('./Currencies.js')(sequelize);
    require('./RecoveryToken')(sequelize);
}
