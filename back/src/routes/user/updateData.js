const User = require('../../db').models.User;
const userDataValidator = require('../../utils/userDataValidator.js');

module.exports = async function(req, res) {
    try {
        if (userDataValidator(User, req.body)) {
            const id = req.user.id;
            const { firstname, lastname, email, password, phone, pin } = req.body;

            const dbUser = await User.update({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: phone,
                pin: pin
            }, {
                where: {
                    id: id,
                }
            });

            res.status(200).send('User update succeeded.');
        } else {
            res.status(400).send('User update failed: invalid values.');
        }
    } catch(error) { next(error) };
};
