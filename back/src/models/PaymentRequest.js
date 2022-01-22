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
    })
}