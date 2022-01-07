const User = require("../../db").models.User;

module.exports = async function(req, res) {
    const id = req.params.id;
    const { firstname, lastname, email, password, phone, pin } = req.body;

    try {
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

        if (dbUser) {
            res.status(200).send("USER UPDATE SUCCEEDED");
        } else {
            res.status(400).send("USER UPDATE FAILED: INVALID ID");
        }
    } catch(error) { next(error) };
}
