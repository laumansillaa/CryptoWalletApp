const User = require('../../db').models.User;
const userDataValidator = require('../../utils/userDataValidator.js');

module.exports = async function(req, res, next) {
    if (userDataValidator(req.body)) {
        try {
            const { firstname, lastname, email, password, phone, pin } = req.body;
                await User.create({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    phone: phone,
                    pin: pin
                })
            res.status(200).send('Sign in succeeded.');
        } catch(error) { next(error) }
    } else {
        res.status(400).send('Sign in failed: invalid values.');
    }
};
