const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('accountMovement', {
        Movement: {
            type: DataTypes.ENUM("Buy", "Sale", "Transfer"),
            allowNull: false
        },
        value: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IdSender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IdReceiver: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}

//Chequear fecha/id movimientos