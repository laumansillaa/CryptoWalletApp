const Transactions = require('../../db').models.Transactions;

module.exports = async function(req, res) {
    try {
        const { from, destination, transactionType, currencySell, sellingAmount, currencyBuy, buyingAmount } = req.body;

        await Transactions.create({
            from: from,
            destination: destination,
            transactionType: transactionType,
            currencySell: currencySell,
            sellingAmount: sellingAmount,
            currencyBuy: currencyBuy,
            buyingAmount: buyingAmount
        })

        return res.status(200).send("Transaction");
    } catch(error) {
        return res.status(400).send("Error")
    }
    
};
