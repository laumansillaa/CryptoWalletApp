const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('transaction', {
        Idsender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IdReceiver: {
            type: DataTypes.STRING,
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
        state: {
            type: DataTypes.ENUM("InProcess", "Accepted", "Rejected" ),
            allowNull: false,
        },
        IdTransaction: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    })
} 