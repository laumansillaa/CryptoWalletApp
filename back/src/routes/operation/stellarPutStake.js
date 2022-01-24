const axios = require("axios");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const { Key, Staking, Operation } = require("../../db").models;
const rewards = require("../../utils/annualRewards");

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION STELLAR STAKING ROUTE ----------")
    try {
        const { stakingCurrency, stakingAmount } = req.body;
        const date = await axios.get("http://worldtimeapi.org/api/ip");
        const yearDay = date.data.day_of_year.toString();
        const reward = rewards.filter(reward => reward.Currency === stakingCurrency);

        const keys = await Key.findOne({ where: { userId: req.user.id } });
        
        const stellarAccount = await server.loadAccount(keys.stellar[0]);
        const stellarKeyPair = StellarSDK.Keypair.fromSecret(keys.stellar[1]);

        const operation = new StellarSDK.TransactionBuilder(stellarAccount, {
            fee: StellarSDK.BASE_FEE,
            networkPassphrase: StellarSDK.Networks.TESTNET
        })
            .addOperation(StellarSDK.Operation.payment({
                destination: "GBIL6YKN2NTZH66PZC7FXD4JTOIMLN2BTAT2WDKG4BWJ2HGADV4TYP6A",
                asset: new StellarSDK.Asset(stakingCurrency, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
                amount: stakingAmount.toString().slice(0, 6)
            }))
            .setTimeout(100).build();

        operation.sign(stellarKeyPair);

        await server.submitTransaction(operation);

         const dbStake =  await Staking.create({
            yearDay: yearDay,
            publicKey: keys.stellar[0],
            blockchain: "stellar",
            currency: stakingCurrency,
            amount: stakingAmount.toString(),
            annualReward: reward[0].annualReward.toString()
        });

        await req.user.addStaking(dbStake);

        const dbOperation = await Operation.create({
            operationType: "put stake",
            blockchain: "stellar",
            from: keys.stellar[0],
            to: "admin",
            currency: stakingCurrency,
            amount: stakingAmount.toString(),
            purchasedCurrency: null,
            purchasedAmount: null
        });

        await req.user.addOperation(dbOperation);

        return res.status(200).send("Stellar stake succeeded.");
    } catch(error) { next(error) }
};
