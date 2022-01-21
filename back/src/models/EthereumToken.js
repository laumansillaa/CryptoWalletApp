const { DataTypes } = require ("sequelize"); 

module.exports = function (sequelize) {
    sequelize.define("EthereumToken", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      timestamps: false,
      // Disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      freezeTableName: true,
    })
}
