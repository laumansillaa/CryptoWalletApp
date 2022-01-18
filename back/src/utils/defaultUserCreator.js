const axios = require("axios");
const Web3 = require("web3")
const web3 = new Web3("HTTP://127.0.0.1:7545");
const StellarSDK = require("stellar-sdk");
const { User, Key } = require("../db").models;

module.exports = async function() {
    try {
        const ethereumPromise = web3.eth.accounts.create();
        const stellarKeyPair = StellarSDK.Keypair.random();
        const stellarPromise = axios.get(`https://friendbot.stellar.org?addr=${stellarKeyPair.publicKey()}`);
        const [ethereumKeyPair] = await Promise.all([ethereumPromise, stellarPromise]);

        const createUserPromise = User.create({
            firstname: "default",
            lastname: "user",
            sessionType: "email",
            email: "default@user.com",
            password: "Password00",
            phone: "1100000000",
            pin: "000000",
        });

        const createKeyPromise = Key.create({
            ethereum: [ethereumKeyPair.address, ethereumKeyPair.privateKey],
            stellar: [stellarKeyPair.publicKey(), stellarKeyPair.secret()]
        });

        const [createdUser, createdKey] = await Promise.all([createUserPromise, createKeyPromise]);

        await createdUser.setKey(createdKey);
    } catch(error) { console.error(error) }
    
}
