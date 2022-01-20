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
            allowNull: false,
            unique: {
                args: "currency",
                msg: "This currency is already staked"
             }
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
