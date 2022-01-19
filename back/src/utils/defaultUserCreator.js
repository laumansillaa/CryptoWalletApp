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
            //stellar: [stellarKeyPair.publicKey(), stellarKeyPair.secret()]
            stellar: ["GDZEM3JQ5ZWAGQ7A6IFT5ZOFJYTHG3ZRDI4SIJKIPX2B6Z4MNNSE3GA4", "SDM3MAX4FFCQXSAF2ZIR3GAIWGQ3XXWKFX5XSBHQRK2QDFSXXMMBNLXA"]
        });

        const [createdUser, createdKey] = await Promise.all([createUserPromise, createKeyPromise]);

        const createUserPromise2 = User.create({
            firstname: "default2",
            lastname: "user2",
            sessionType: "email",
            email: "default2@user.com",
            password: "Password01",
            phone: "1100000001",
            pin: "000001",
        });

        const createKeyPromise2 = Key.create({
            ethereum: [ethereumKeyPair.address, ethereumKeyPair.privateKey],
            //stellar: [stellarKeyPair.publicKey(), stellarKeyPair.secret()]
            stellar: ["GCHENQKEFJN5MXPYH3QWDMTN6WOY2H2SFE2HICL2UVZVZ6IGLJJ4ZTRH", "SCNK7VIHA6GCNTLPD3A2WZNT7ULDXHTGZGKBBZIIPBPMBPEVAAHRYAGP"]
        });

        const [createdUser2, createdKey2] = await Promise.all([createUserPromise2, createKeyPromise2]);

        await createdUser.setKey(createdKey);
        await createdUser2.setKey(createdKey2);
    } catch(error) { console.error(error) }
    
}
