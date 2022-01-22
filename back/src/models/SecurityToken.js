const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    sequelize.define('SegurityToken', {
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