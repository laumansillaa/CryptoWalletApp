const PaymentRequest = require('../../db').models.PaymentRequest
const User = require('../../db').models.User


module.exports = async (req, res, next) => {

    try {
        //BUSCO LA ORDEN
        const valor = req.query.preference_id
        const payment = await PaymentRequest.findAll({
            where: {
                preferenceId: valor
            }
        })
    
        //USUARIO
        const userPayment = await User.findAll({
            where: {
                email: payment[0].email
            }
        })
/*         console.log("SOY EL USER", payment[0].email) */
        
        //ACTUALIZO EL STATUS
        const payments = await PaymentRequest.update({
            status: "Success"
        }, {
            where: {
                preferenceId: valor
            }
        })
    
        //ACTUALIZO EL VALOR USD DEL USUARIO
 
        if(true) {
          /*   console.log("ENTRE AL IF") */
            const updatedUsdValue = Number(userPayment[0].usd) + Number(payment[0].usd)
    
            const update = await User.update({
                usd: updatedUsdValue.toString()
            }, {
                where: {
                    email: payment[0].email
                }
            });


            res.status(200).send("Success");

        }

    } catch (error) {
        next(error)
    }
}

