const  User  = require ('../../db').models.User;
const SegurityToken = require('../../db').models.SegurityToken;


module.exports = async function (req, res, next) {
    
    try{
                
        const {token, password, confirmPassword} = req.body
    
        if(!token){
            res.status(400).send({
                message: "A token is required. If you don't have one, please request one."
            })
        }

        const resetPassword = await SegurityToken.findOne({
            where: {
                token: token       
            }
        })

        if (!resetPassword){
            return res.status(403).send({
                message: "Something went wrong. Check the data"
            })

        } else {

            if(!password){
                res.status(400).send({
                    message: "A password is required"
                })
            }
            if (!confirmPassword){
                res.status(400).send({
                    message: "A confirm password is required"
                })
            }
            if (password !== confirmPassword){
                res.status(400).send({
                    message: "Passwords do not match"
                })
            } else {
                const userDb = resetPassword.email
                const dbUser = await User.update({
                    password: password
                }, {
                    where: {
                        email: userDb
                    }
                })
                res.status(200).send("Password update succeded")
                
                await SegurityToken.destroy({
                    where: {
                        token: token
                    }
                })
            }
        }   

    } catch (error) {
        next(error)
    }

}