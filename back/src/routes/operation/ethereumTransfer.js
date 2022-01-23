const { ADMIN_ETHEREUM_PUBLIC_KEY, ADMIN_ETHEREUM_PRIVATE_KEY, INFURA_URL } = process.env;
const Web3 = require("web3");
const web3 = new Web3(INFURA_URL);
const { Key, Operation } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHER TRANSFER ROUTE ----------")
    try {
        const to = req.body.pKey, { transferCurrency, transferAmount } = req.body;
        const [publicKey, privateKey] = (await Key.findOne({ where: { userId: req.user.id } })).ethereum;

        if (transferCurrency === "ETH") {
            const value = (Math.floor(transferAmount*10**18)).toString();
            const gasLimit = 21000;
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(publicKey);

            const signedTransaction = await web3.eth.accounts.signTransaction({
                to,
                value, 
                gasLimit,
                gasPrice,
                nonce
            }, privateKey);

            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        } else {
            const tokenContract = await require("../../solidity")(transferCurrency);
            const value = Math.floor(transferAmount*10**4);
            const transaction = tokenContract.methods.transfer(to, value);
            const data = transaction.encodeABI();
            const gas = await transaction.estimateGas({ from: publicKey });
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(publicKey);

            const signedTransaction = await web3.eth.accounts.signTransaction({
                to, 
                data, 
                gas, 
                gasPrice, 
                nonce, 
            }, privateKey);

            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        }

        const dbOperation = await Operation.create({
            operationType: "transfer",
            blockchain: "ethereum",
            from: publicKey,
            to,
            currency: transferCurrency,
            amount: transferAmount.toString(),
            purchasedCurrency: null,
            purchasedAmount: null
        });

        await req.user.addOperation(dbOperation);

        return res.status(200).send("Ethereum transfer succeeded.");
    } catch(error) { next(error) }
};
