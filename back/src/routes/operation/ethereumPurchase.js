const { ADMIN_ETHEREUM_PUBLIC_KEY, ADMIN_ETHEREUM_PRIVATE_KEY, INFURA_URL } = process.env;
const Web3 = require("web3");
const web3 = new Web3(INFURA_URL);
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Operation } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHEREUM PURCHASE ROUTE ----------")
    try {
        const usdAmount = req.body.amount, { purchaseCurrency } = req.body; 
        const publicKey = (await Key.findOne({ where: { userId: req.user.id } })).ethereum[0];
        const prices = await binance.futuresPrices();
        const purchaseAmount = (purchaseCurrency === "USDT") 
            ? usdAmount / 1
            : (purchaseCurrency === "HNR")
            ? usdAmount / 4000
            : await usdAmount / prices[`${purchaseCurrency}USDT`];

        if (purchaseCurrency === "ETH") {
            const to = publicKey;
            const value = (Math.floor(purchaseAmount*10**18)).toString();
            const gasLimit = 21000;
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(ADMIN_ETHEREUM_PUBLIC_KEY);

            const signedTransaction = await web3.eth.accounts.signTransaction({
                to,
                value, 
                gasLimit,
                gasPrice,
                nonce
            }, ADMIN_ETHEREUM_PRIVATE_KEY);

            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        } else {
            const tokenContract = await require("../../solidity")(purchaseCurrency);
            const to = tokenContract.options.address;
            const value = Math.floor(purchaseAmount*10**4);
            const transaction = tokenContract.methods.transfer(publicKey, value);
            const data = transaction.encodeABI();
            const gas = await transaction.estimateGas({ from: ADMIN_ETHEREUM_PUBLIC_KEY });
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(ADMIN_ETHEREUM_PUBLIC_KEY);

            const signedTransaction = await web3.eth.accounts.signTransaction({
                to, 
                data, 
                gas, 
                gasPrice, 
                nonce, 
            }, ADMIN_ETHEREUM_PRIVATE_KEY);

            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        }

        const dbOperation = await Operation.create({
            operationType: "purchase",
            blockchain: "ethereum",
            from: publicKey,
            to: "admin",
            currency: "usd",
            amount: usdAmount.toString(),
            purchasedCurrency: purchaseCurrency,
            purchasedAmount: purchaseAmount.toString()
        });

        await req.user.addOperation(dbOperation);

        const updatedUsdValue = Number(req.user.usd) - Number(usdAmount);
        await req.user.update({
            usd: updatedUsdValue.toString()
        });
        
        return res.status(200).send("Ethereum purchase succeeded.");
    } catch(error) { next(error) }
};
