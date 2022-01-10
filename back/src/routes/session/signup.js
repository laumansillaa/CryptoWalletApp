const User = require('../../db').models.User;
const userDataValidator = require('../../utils/userDataValidator.js');

module.exports = async function(req, res, next) {
    const { availableEmail, validValues } = await userDataValidator(User, req.body)
    if (availableEmail && validValues) {
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

            return res.status(200).send('Sign up succeeded.');
        } catch(error) { next(error) }
    } else if (!availableEmail){
        return res.status(400).send('Sign up failed: email not available.');
    } else if (!validValues) {
        return res.status(400).send('Sign up failed: invalid values.');
    }
};
