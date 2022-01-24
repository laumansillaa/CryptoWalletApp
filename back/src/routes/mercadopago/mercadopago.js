const PaymentRequest = require('../../db').models.PaymentRequest
const mercadopago = require("mercadopago");
const {TOKEN_MERCADOPAGO} = process.env;
mercadopago.configure({
    access_token: TOKEN_MERCADOPAGO
})

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
                "success": "http://localhost:3001/payment/success",
                "failure": "http://localhost:3001/payment/failure",
                "pending": "http://localhost:3001/payment/feedback"
            },            
            marketplace: "Henry Wallet",
            auto_return: "approved",
                 
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
            console.log("soy el RESIDD",response.body.sandbox_init_point)
            res.json({
                id: response.body.id,
                sandbox: response.body.sandbox_init_point
            })            
        })

    }catch(error){next(error)}
}