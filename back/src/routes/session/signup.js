const axios = require("axios");
const Web3 = require("web3")
const web3 = new Web3(process.env.INFURA_URL);
const StellarSDK = require("stellar-sdk");
const { User, Key, SegurityToken } = require("../../db").models;
const userDataValidator = require("../../utils/userDataValidator.js");
const nodemailer = require('nodemailer');
const pgenerator = require('generate-password')
const {EMAIL_ADDRESS, EMAIL_PASSWORD} = process.env;

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
                verifieldUser: false
            });


            const token = pgenerator.generate({
                length: 5,
                numbers: true
            })

            const tokenUser = await SegurityToken.create({
                token,
                email
            })

            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: `${EMAIL_ADDRESS}`,
                    pass: `${EMAIL_PASSWORD}`
                }
            })

            const mailOption = {
                from: `${EMAIL_ADDRESS}`,
                to: email,
                subject: 'Password recovery process',
                text: 
                `Hello! To verify your account we need you to enter the security token.
                No one from the support team is going to ask you. For your safety, please do not share it.


                SECURITY TOKENS: ${token}`
            }

            transporter.sendMail(mailOption, (err, response) => {
                if (err) {
                    console.log('Error al enviar email', err)
                } else {
                    console.log('Verify token was sent')
                }
            })

            const createKeyPromise = Key.create({
                ethereum: [ethereumKeyPair.address, ethereumKeyPair.privateKey],
                stellar: [stellarKeyPair.publicKey(), stellarKeyPair.secret()]
            });

            const [createdUser, createdKey] = await Promise.all([createUserPromise, createKeyPromise]);
    
            await createdUser.setKey(createdKey);

            return res.status(200).send(`"Sign up succeeded.", ${token}`);
        } catch(error) { next(error) }
    } else if (!availableEmail){
        return res.status(400).send("Sign up failed: email not available.");
    } else if (!validValues) {
        return res.status(400).send("Sign up failed: invalid values.");
    }
};
