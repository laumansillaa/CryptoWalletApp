const { DataTypes, Op } = require ('sequelize'); 

module.exports = (sequelize) => {
    sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6,20],
                isAlphanumeric: true           
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
        },
        publicKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secretKey: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
