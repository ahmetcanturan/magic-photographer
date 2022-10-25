import md5 from "md5"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import nodemailer from "nodemailer"
import html_template from "../const/html_template.js"
const hashToPassword = (password) => {
    return md5(password)
}


const createToken = (userId, username, email) => {
    const token = jwt.sign({
        userId,
        username,
        email
    }, process.env.SECRET_KEY, {
        issuer: "localhost",
        expiresIn: process.env.EXPIRESIN
    })
    return token
}

const verifyToken = (token) => {
    const isVerify = { decodedToken: null }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        isVerify.decodedToken = decodedToken
    } catch (error) {
        isVerify.decodedToken = null
    }
    return isVerify
}

const validate = (req, res, render_page) => {
    try {
        const validationErrors = validationResult(req)
        if (validationErrors.isEmpty() === false) {
            res.locals.error = validationErrors.array()
            switch (render_page) {
                case "register":
                    res.status(400).render(render_page)
                    break;
                case "login":
                    res.status(400).render(render_page)
                    break;
                default:
                    break;
            }
            return validationErrors
        }
        return null
    } catch (error) {
        console.log("responseValidatorError:", error)
    }
}

const mail = async (req) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        // true for 465, false for other ports
        auth: {
            user: process.env.MAIL, // generated ethereal user
            pass: process.env.MAIL_PASS, // generated ethereal password
        },
    });
    await transporter.sendMail({
        to: "ahmtcntrn@hotmail.com", // list of receivers
        subject: `magic_photographer:${req.body.email}`, // Subject line
        html: html_template(req), // html body
    })
}

export { hashToPassword, createToken, verifyToken, validate, mail }