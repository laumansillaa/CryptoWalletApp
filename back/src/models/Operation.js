const { DataTypes } = require ("sequelize"); 

module.exports = function (sequelize) {
    sequelize.define("Operation", {
        operationType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["purchase", "sell", "transfer", "swap"]]
            }
        },
        blockchain: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["ethereum", "stellar"]]
            }
        },
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purchasedCurrency: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                checkOperationType(value) {
                    if ((this.operationType === "purchase" || this.operationType === "sell") && value === null) {
                        throw new Error("Purchased currency can't be null when the operation type is 'purchase' or 'sell'.") 
                    } else if (this.operationType !== "purchase" && this.operationType !== "sell" && value !== null) {
                        throw new Error("Purchased currency must be null when the operation type isn't 'purchase' or 'sell'.") 
                    }
                }

            }
        },
        purchasedAmount: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                checkOperationType(value) {
                    if ((this.operationType === "purchase" || this.operationType === "sell") && value === null) {
                        throw new Error("Purchased amount can't be null when the operation type is 'purchase' or 'sell'.") 
                    } else if (this.operationType !== "purchase" && this.operationType !== "sell" && value !== null) {
                        throw new Error("Purchased amount must be null when the operation type isn't 'purchase' or 'sell'.") 
                    }
                }

            }
        }
    },
    {
      // Disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      freezeTableName: true,
    })
}
