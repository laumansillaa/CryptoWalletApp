module.exports = function(sequelize) {
    require('./User.js')(sequelize);
    require('./Currencies.js')(sequelize);
    require('./Transactions.js')(sequelize);
}
