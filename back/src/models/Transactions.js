const { DataTypes, Op } = require ('sequelize'); 

module.exports = function (sequelize) {
    sequelize.define('Transactions', {
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        transactionType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currencySell: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sellingAmount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currencyBuy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        buyingAmount: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
