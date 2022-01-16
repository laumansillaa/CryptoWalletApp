module.exports = (req, res, next) => {
    console.log("FEEDBACK JSON", res)
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    })
}

