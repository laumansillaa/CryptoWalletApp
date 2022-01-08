const User = require('../../db').models.User;

module.exports = async function(req, res) {
    try {
        const id = req.user.id;

        const dbUser = await User.findByPk(id);

        res.status(200).send(dbUser)
    } catch(error) { next(error) };
};
