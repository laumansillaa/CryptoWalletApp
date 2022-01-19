const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const { Key, Operation } = require("../../db").models;
const { ADMIN_ETHEREUM_PUBLIC_KEY, ADMIN_ETHEREUM_PRIVATE_KEY } = process.env;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHER TRANSFER ROUTE ----------")
    try {
        // We get te user public and private keys from data base. User is the one executing the transfer operation.
        // The person who will receive the crypto currency comes from <to> variable through the request body. 
        const { to, currency, amount } = req.body;
        const [publicKey, privateKey] = (await Key.findOne({ where: { userId: req.user.id } })).ethereum

        if (currency === "ETH") {
            const transactionCount = await web3.eth.getTransactionCount(publicKey);
            const transaction = {
                nonce: web3.utils.toHex(transactionCount),
                to: to,
                value: web3.utils.toHex(web3.utils.toWei(amount.toString(), "ether")),
                gasLimit: web3.utils.toHex(21000),
                gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
            };
            const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);
            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

            const dbOperation = await Operation.create({
                operationType: "transfer",
                blockchain: "ethereum",
                from: publicKey,
                to: to,
                currency: currency,
                amount: amount,
                purchasedCurrency: null,
                purchasedAmount: null
            });

            await req.user.addOperation(dbOperation);

            return res.status(200).send("Ethereum transfer succeeded.");
        } else return res.status(400).send("Currency variable must be 'ETH'");
    } catch(error) { next(error) }
};
