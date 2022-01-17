const { Op } = require('sequelize');
const { Operation, UserOperation } = require("../../db.js").models;

module.exports = async function(req, res, next) {
    try {
        const operationsIndexes = await UserOperation.findAll({
            where: {
                userId: req.user.id
            },
            attributes: ['userId'],
            through: { attributes: [] }
        });

        console.log(operationsIndexes);

        const operations = await Operation.findAll({
            where: {
                id: {
                    [Op.in]: operationsIndexes
                }
            }
        })

        res.status(200).send(operations);
    } catch(error) { next(error) }
}
