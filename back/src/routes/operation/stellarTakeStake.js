const axios = require("axios");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const { Key, Staking } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION STELLAR TAKE-STAKE ROUTE ----------")
    try {
        const { stakingCurrency } = req.body;
        const date = await axios.get("http://worldtimeapi.org/api/ip");
        const yearDay = date.data.day_of_year;
        
        const userKeys = await Key.findOne({ where: { userId: req.user.id } });
        const stakeOperation = await Staking.findOne({ where: { publicKey: userKeys.stellar[0], currency: stakingCurrency }})
        
        const amountDays = parseFloat(yearDay) - parseFloat(stakeOperation.yearDay);
        const amountPorc = (amountDays * parseFloat(stakeOperation.annualReward)) / 365;
        const amountReward = (parseFloat(amountPorc) * parseFloat(stakeOperation.amount)) + parseFloat(stakeOperation.amount);

        const stellarAccount = await server.loadAccount("GBIL6YKN2NTZH66PZC7FXD4JTOIMLN2BTAT2WDKG4BWJ2HGADV4TYP6A");
        const stellarKeyPair = StellarSDK.Keypair.fromSecret("SAE5M5RBFGTHOGQZ3QVPVZEI6YINXRLOAIA3QCC56VVBVPN3YTX6UV5S");

        const operation = new StellarSDK.TransactionBuilder(stellarAccount, {
            fee: StellarSDK.BASE_FEE,
            networkPassphrase: StellarSDK.Networks.TESTNET
        })
            .addOperation(StellarSDK.Operation.payment({
                destination: userKeys.stellar[0],
                asset: new StellarSDK.Asset(stakingCurrency, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
                amount: amountReward.toString().slice(0, 6)
            }))
            .setTimeout(100).build();

        operation.sign(stellarKeyPair);

        await server.submitTransaction(operation);
        
        await stakeOperation.destroy();

        return res.status(200).send("Stellar take-stake succeeded.");
    } catch(error) { next(error) }
};
