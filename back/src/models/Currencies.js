const { DataTypes, Op } = require ('sequelize'); 

module.exports = function (sequelize) {
    sequelize.define('Currencies', {
        publicKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        BTC: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ETH: {
            type: DataTypes.STRING,
            allowNull: true
        },
        BNB: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SOL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ADA: {
            type: DataTypes.STRING,
            allowNull: true
        },
        XRP: {
            type: DataTypes.STRING,
            allowNull: true
        },
        LUNA: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DOT: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DOGE: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SHIB: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}