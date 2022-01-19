const User = require('../../db').models.User;
const userDataValidator = require('../../utils/userDataValidator.js');

module.exports = async function(req, res) {
    console.log('---------- ROUTE USER UPDATE DATA ----------')
    try {
        if (userDataValidator(User, req.body)) {
            const { firstname, lastname, email, password, phone, pin } = req.body;

            await req.user.update({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: phone,
                pin: pin
            });

            return res.status(200).send('User update succeeded.');
        } else {
            return res.status(400).send('User update failed: invalid values.');
        }
    } catch(error) { next(error) };
};
