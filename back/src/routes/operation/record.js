const { Op } = require('sequelize');
const { Operation, UserOperation } = require("../../db.js").models;

module.exports = async function(req, res, next) {
    try {
        const operationsIndexes = (await UserOperation.findAll({
            where: {
                userId: req.user.id
            },
        })).map(operationIndex => operationIndex.operationId);

        const operations = await Operation.findAll({
            where: {
                id: {
                    [Op.in]: operationsIndexes
                }
            }
        });

        res.status(200).send(operations);
    } catch(error) { next(error) }
}
