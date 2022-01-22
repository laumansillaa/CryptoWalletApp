const PaymentRequest = require('../../db').models.PaymentRequest

module.exports = async function (req, res, next){
    console.log('--------- ROUTE MERCADO PAGO FAILURE -----------')
    const valor = req.query.preference_id;


    const payments = await PaymentRequest.update({
        status: "Failure"
    }, {
        where: {
            preferenceId: valor
        }
    })

    res.status(200).send("Su pago ha sido rechazado")
}