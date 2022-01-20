const  User  = require ('../../db').models.User;
const RecoveryToken = require('../../db').models.RecoveryToken;


module.exports = async function (req, res, next) {
    
    try{
                
        const {token, email, password } = req.body
    
        if(!token){
            res.status(400).send({
                message: "A token is required. If you don't have one, please request one."
            })
        }

        const resetPassword = await RecoveryToken.findOne({
            where: {
                token: token,
                email: email
            }
        })

        if (!resetPassword){
            return res.status(403).send({
                message: "Something went wrong. Check the data"
            })

        } else {

            if(!email) {
                res.status(400).send({
                    message: "A email is required"
                })

            } else {
                if(!password){
                    res.status(400).send({
                        message: "A password is required"
                    })
                }
                const dbUser = await User.update({
                    password: password
                }, {
                    where: {
                        email: email
                    }
                })

                res.status(200).send("Password update succeded")
            }
            
            await RecoveryToken.destroy({
                where: {
                    token: token
                }
            })
        }

    } catch (error) {
        next(error)
    }

}