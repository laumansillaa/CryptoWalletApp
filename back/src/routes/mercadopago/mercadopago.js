const PaymentRequest = require('../../db').models.PaymentRequest
const mercadopago = require("mercadopago");
const {TOKEN_MERCADOPAGO} = process.env;
mercadopago.configure({
    access_token: TOKEN_MERCADOPAGO
})
const {IP_HOST} = process.env;

module.exports = async (req, res, next) => {
    try{
        let preference = {
            items: [
                {
                    title: "Payment process",
                    unit_price: Number(req.body.unit_price),
                    quantity: 1                
                }
            ],
            back_urls: {
                success: `https://jralvarezwindey-wallet-app.herokuapp.com/payment/success`,
                failure: `https://jralvarezwindey-wallet-app.herokuapp.com/payment/failure`,
                pending: `https://jralvarezwindey-wallet-app.herokuapp.com/payment/feedback`
            },            
            marketplace: "Henry Wallet",
           
                 
        }
    
        mercadopago.preferences.create(preference)


        .then((response) => {
            // console.log("PROCESS PAYMENT", response)
            const paymentReq = PaymentRequest.create({
                preferenceId: response.body.id,
                email: req.user.email,
                usd: req.body.unit_price,
                status: "IN PROCESS"
            })
      
            res.json({
                id: response.body.id,
                sandbox: response.body.sandbox_init_point
            })            
        })

    }catch(error){next(error)}
}