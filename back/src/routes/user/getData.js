const { Contact, Key } = require("../../db.js").models;

module.exports = async function(req, res, next) {
    console.log('---------- ROUTE USER GET DATA ----------')
    try  {
        const contacts = await Contact.findAll({
            where: {
                userId: req.user.id
            }
        });

        const keys = await Key.findOne({
            where: {
                userId: req.user.id
            }
        });

        return res.status(200).send({
            ...req.user.dataValues,
            contacts: contacts.map(contact => {
                return { 
                    name: contact.name, 
                    ethereumPublicKey: contact.ethereumPublicKey,
                    stellarPublicKey: contact.stellarPublicKey 
                } 
            }),
            publicKeys: {
                ethereum: keys.ethereum[0],
                stellar: keys.stellar[0]
            }
        });
    } catch(error) { next(error) }
};
