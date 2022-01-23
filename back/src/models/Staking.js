const { DataTypes } = require ("sequelize"); 

module.exports = function (sequelize) {
    sequelize.define("Staking", {
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
        yearDay: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: "currency",
                msg: "This currency is already staked."
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
    },
    {
      // Disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      freezeTableName: true,
    })
}
