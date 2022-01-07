const axios = require("axios");
const { User } = require("../../db.js");

module.exports = async (req, res) => {
    const id = req.params.id;
    const dbUser = await User.findByIdAndUpdate({ id: id }, req.body);

    if(dbUser) {
        res.status(200).send("USER UPDATED");
    } else {
        res.status(400).send("FAILED UPDATE");
    }

    // const id = req.params.id;
    // let { name, lastname, email, phone, password, pin } = req.body;
    // const dbUser = await /*model*/findByPk(id);

    // if(name) dbUser.name = name;
    // if(lastname) dbUser.lastname = lastname;
    // if(email) dbUser.email = email;
    // if(phone) dbUser.phone = phone;
    // if(password && parseInt(password) && password.length >= 6) dbUser.password = password;
    // if(pin && pin.length === 6) dbUser.pin = pin;

    // res.status(200).send("USER UPDATED");
}
