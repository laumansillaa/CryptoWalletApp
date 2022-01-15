const { DataTypes, Op } = require ('sequelize'); 

module.exports = function (sequelize) {
    sequelize.define('Transactions', {
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        transactionType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currencyEgress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        egressAmount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currencyIngress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ingressAmount: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}
