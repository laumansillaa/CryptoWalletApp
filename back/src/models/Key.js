const { DataTypes } = require ("sequelize"); 

module.exports = function (sequelize) {
    sequelize.define("Key", {
        ethereum: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                checkLength(value) {
                    if (this.ethereum.length !== 2) throw new Error("You must provide one public key and one private key.")
                }
            }
        },
        stellar: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                checkLength(value) {
                    if (this.ethereum.length !== 2) throw new Error("You must provide one public key and one private key.")
                }
            }
        }
    },
    {
      timestamps: false,
      // Disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      freezeTableName: true,
    })
}
