const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    sequelize.define('PaymentRequest', {
        preferenceId: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING
        },
        usd: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    },
    {
      // Disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      freezeTableName: true,
    })
}
