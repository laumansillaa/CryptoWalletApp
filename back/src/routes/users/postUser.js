const axios = require("axios");
const { User } = require("../../db.js");

module.exports = async (req, res) => {
    let { name, lastname, email, phone, password, pin } = req.body;

    if(email.includes("@") && email.includes(".com") && parseInt(password) && password.length >= 6 && pin.length === 6) {
        let createUser = await User.create({
            name: name,
            lastname: lastname,
            email: email,
            phone: phone,
            password: password,
            pin: pin
        })
        res.status(200).send("USER CREATED");
    } else {
        res.status(400).send("INVALID VALUES");
    }
}
