const axios = require("axios");
const { User } = require("../../db").models;

module.exports = async (req, res) => {
    const id = req.params.id;
    let { firstname, lastname, email, password, phone, pin } = req.body;

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

    if(dbUser) {
        res.status(200).send("USER UPDATED");
    } else {
        res.status(400).send("FAILED UPDATE");
    }

}