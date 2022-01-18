const { DataTypes } = require ("sequelize"); 

module.exports = function (sequelize) {
    sequelize.define("User", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sessionType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["google", "email"]]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [8,20],
                isAlphanumeric: true,           
                checkSessionType(value) {
                    if (this.sessionType !== "google" && value === null) {
                        throw new Error("Password can't be null when not signing in to Google.") 
                    } else if (this.sessionType === "google" && value !== null) {
                        throw new Error("Password must be null when signing in to Google.") 
                    }
                }
            }
        },
        phone: {
            type: DataTypes.STRING,    
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^\d{6}$/,
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
