const User = require('../../db').models.User;
const userDataValidator = require('../../utils/userDataValidator.js');
const StellarSDK = require("stellar-sdk");
const axios = require("axios");

module.exports = async function(req, res, next) {
    console.log('---------- ROUTE SESSION SIGN UP ----------')
    const { availableEmail, validValues } = await userDataValidator(User, req.body)
    if (availableEmail && validValues) {
        try {
            const { firstname, lastname, email, password, phone, pin } = req.body;
            const keyPair = StellarSDK.Keypair.random();

            await User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: phone,
                pin: pin,
                publicKey: keyPair.publicKey(),
                secretKey: keyPair.secret()
            })

            await axios.get(`https://friendbot.stellar.org?addr=${keyPair.publicKey()}`);

            return res.status(200).send('Sign up succeeded.');
        } catch(error) {
            next(error) 
        }
    } else if (!availableEmail){
        return res.status(400).send('Sign up failed: email not available.');
    } else if (!validValues) {
        return res.status(400).send('Sign up failed: invalid values.');
    }
};
