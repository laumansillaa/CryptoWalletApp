const { User } = require("../../db").models;

module.exports = async function(req, res, next) {
    const { firstname, lastname, email, password, phone, pin } = req.body;

    try {
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const passwordRegex = /^(?=\w*\d)(?=\w*[a-z])\S{6,20}$/;

        if(emailRegex.test(email) && passwordRegex.test(password)) {
            await User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: phone,
                pin: pin
            })
            res.status(200).send("USER CREATION SUCCEEDED");
        } else {
            res.status(400).send("USER CREATION FAILED: INVAILD VALUES");
        }
    } catch(error) { next(error) }
}
