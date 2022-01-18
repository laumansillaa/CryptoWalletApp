const { DataTypes } = require ("sequelize"); 

module.exports = function (sequelize) {
    sequelize.define("Contact", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publicKey: {
            type: DataTypes.STRING,
        }
    },
    {
      timestamps: false,
      // Disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      freezeTableName: true,
    })
}
