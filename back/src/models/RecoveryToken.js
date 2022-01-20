const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    sequelize.define('RecoveryToken', {
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        }
    })
}