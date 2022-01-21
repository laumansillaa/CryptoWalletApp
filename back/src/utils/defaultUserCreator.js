const axios = require("axios");
const Web3 = require("web3")
const web3 = new Web3("HTTP://127.0.0.1:7545");
const StellarSDK = require("stellar-sdk");
const { User, Key } = require("../db").models;

module.exports = async function() {
    try {
        const ethereumPromise = web3.eth.accounts.create();
        const ethereumPromise2 = web3.eth.accounts.create();
        const [ethereumKeyPair, ethereumKeyPair2] = await Promise.all([ethereumPromise, ethereumPromise2]);

        console.log(User);
        const createUserPromise = User.create({
            firstname: "default",
            lastname: "user",
            sessionType: "email",
            email: "default@user.com",
            password: "Password00",
            usd: "100000",
            phone: "1100000000",
            pin: "000000",
            verifieldUser: true,
        });

        const createKeyPromise = Key.create({
            ethereum: [ethereumKeyPair.address, ethereumKeyPair.privateKey],
            stellar: ["GDZEM3JQ5ZWAGQ7A6IFT5ZOFJYTHG3ZRDI4SIJKIPX2B6Z4MNNSE3GA4", "SDM3MAX4FFCQXSAF2ZIR3GAIWGQ3XXWKFX5XSBHQRK2QDFSXXMMBNLXA"]
        });

        const createUserPromise2 = User.create({
            firstname: "default2",
            lastname: "user2",
            sessionType: "email",
            email: "default2@user.com",
            password: "Password01",
            usd: "100000",
            phone: "1100000001",
            pin: "000001",
            verifieldUser: true,
        });

        const createKeyPromise2 = Key.create({
            ethereum: [ethereumKeyPair2.address, ethereumKeyPair2.privateKey],
            stellar: ["GCHENQKEFJN5MXPYH3QWDMTN6WOY2H2SFE2HICL2UVZVZ6IGLJJ4ZTRH", "SCNK7VIHA6GCNTLPD3A2WZNT7ULDXHTGZGKBBZIIPBPMBPEVAAHRYAGP"]
        });

        const [createdUser, createdKey, createdUser2, createdKey2] = await Promise.all([createUserPromise, createKeyPromise, createUserPromise2, createKeyPromise2]);

        await Promise.all([createdUser.setKey(createdKey), createdUser2.setKey(createdKey2)]);
    } catch(error) { console.error(error) }
    
}
