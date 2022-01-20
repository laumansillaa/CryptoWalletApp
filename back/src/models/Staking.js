const { DataTypes } = require ("sequelize"); 

module.exports = function (sequelize) {
    sequelize.define("Staking", {
        yearDay: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publicKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blockchain: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["ethereum", "stellar"]]
            }
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        annualReward: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
