const axios = require("axios");
const Web3 = require("web3")
const web3 = new Web3("HTTP://127.0.0.1:7545");
const StellarSDK = require("stellar-sdk");
const { User, Key } = require("../../db").models;
const userDataValidator = require("../../utils/userDataValidator.js");

module.exports = async function(req, res, next) {
    console.log("---------- SESSION SIGN UP ROUTE ----------")
    const { availableEmail, validValues } = await userDataValidator(User, req.body)

    if (availableEmail && validValues) {
        try {
            const { firstname, lastname, email, password, phone, pin } = req.body;
            
            const ethereumPromise = web3.eth.accounts.create();
            const stellarKeyPair = StellarSDK.Keypair.random();
            const stellarPromise = axios.get(`https://friendbot.stellar.org?addr=${stellarKeyPair.publicKey()}`);
            const [ethereumKeyPair] = await Promise.all([ethereumPromise, stellarPromise]);

            const createUserPromise = User.create({
                firstname: firstname,
                lastname: lastname,
                sessionType: "email",
                email: email,
                password: password,
                usd: "0",
                phone: phone,
                pin: pin,
            });

            const createKeyPromise = Key.create({
                ethereum: [ethereumKeyPair.address, ethereumKeyPair.privateKey],
                stellar: [stellarKeyPair.publicKey(), stellarKeyPair.secret()]
            });

            const [createdUser, createdKey] = await Promise.all([createUserPromise, createKeyPromise]);
    
            await createdUser.setKey(createdKey);

            return res.status(200).send("Sign up succeeded.");
        } catch(error) { next(error) }
    } else if (!availableEmail){
        return res.status(400).send("Sign up failed: email not available.");
    } else if (!validValues) {
        return res.status(400).send("Sign up failed: invalid values.");
    }
};
