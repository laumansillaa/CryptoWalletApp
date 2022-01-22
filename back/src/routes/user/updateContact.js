const { Contact } = require("../../db.js").models;

module.exports = async function(req, res, next) {
    console.log('---------- ROUTE USER UPDATE CONTACT ----------')
    try {
        const { id, name, ethereumPublicKey, stellarPublicKey } = req.body;

        const contact = await Contact.findOne({ where: { id } });
        await contact.update({
            name,
            ethereumPublicKey,
            stellarPublicKey
        });

        return res.status(200).send("Contact update succeeded.")
    } catch(error) { next(error) };
};
