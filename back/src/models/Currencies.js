const { DataTypes, Op } = require ('sequelize'); 

module.exports = function (sequelize) {
    sequelize.define('Currencies', {
        BTC: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ETH: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BNB: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SOL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ADA: {
            type: DataTypes.STRING,
            allowNull: false
        },
        XRP: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LUNA: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DOT: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DOGE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SHIB: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}