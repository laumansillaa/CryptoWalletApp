const  User  = require ('../../db').models.User;
const SegurityToken = require('../../db').models.SegurityToken;
const nodemailer = require('nodemailer');
const axios = require('axios');
const pgenerator = require('generate-password')
const {EMAIL_ADDRESS, EMAIL_PASSWORD} = process.env;
require('dotenv').config();


module.exports = async function (req, res, next) {   
    
    const email = req.body.email

    if (!email) {
        res.status(400).send({
            message: "Email address is required"
        })
    }

    try {

        const userdb = await User.findAll({
            where: {
                email: email
            }
        })

        if(!userdb) {
            return res.status(403).send({
                message: "Email not found"
            })
        };


        const token = pgenerator.generate({
            length: 5,
            numbers: true
        })

        const tokenUser = await SegurityToken.create({
            token,
            email
        })        

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${EMAIL_ADDRESS}`,
                pass: `${EMAIL_PASSWORD}`
            }
        });

        const mailOption = {
            from: `${EMAIL_ADDRESS}`,
            to: email,
            subject: 'Password recovery process',
            text: 
            `Hi, this is your password reset token. Please, for your safety do not share it.
            Security token: ${token}`
        }

        transporter.sendMail(mailOption, (err, response) => {
            if(err) {
                console.error('Ocurrio un error: ', err)
            } else {
                res.status(200).json('Password recovery email was sent')
            }
        })

    } catch (error) {
        next(error)
    }
}