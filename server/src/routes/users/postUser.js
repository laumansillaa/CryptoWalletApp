const axios = require("axios");
const { User } = require("../../db").models;

module.exports = async (req, res) => {
    let { firstname, lastname, email, password, phone, pin } = req.body;

    if(email.includes("@") && email.includes(".com") && parseInt(password) && password.length >= 6 && pin.length === 6) {
        await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
            pin: pin
        })
        console.log(await User.findAll())
        res.status(200).send("USER CREATED");
    } else {
        res.status(400).send("INVALID VALUES");
    }
}
