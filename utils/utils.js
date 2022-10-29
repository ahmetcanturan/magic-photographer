import md5 from "md5"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import nodemailer from "nodemailer"
import html_template from "../const/html_template.js"
import { customAlphabet } from "nanoid"
import fs from "fs"
import path from "path"
import { cwd } from "node:process"

const logFile = (filename, data) => {
    const location = cwd()
    const dir = path.join(location, `/logs/${filename}.txt`)
    if (!fs.existsSync(dir)) {
        const writeData = JSON.stringify(data, null, 4)
        fs.writeFileSync(dir, writeData)
    }
    else {
        const writeData2 = JSON.stringify(data, null, 4)
        fs.appendFileSync(dir, `\n${writeData2}`)
    }
}

const nanoid = customAlphabet("0123456789QAZXSWEDCVFRTGBNHYUJMKILOPqazxswedcvfrtgbnhyujmklopi", 20)



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
                case "donate":
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
//? TC number validate 
const validateTcNumber = (value) => {
    value = String(value);

    // T.C. identity number should have 11 digits and first should be non-zero.
    if (!(/^[1-9]\d{10}$/).test(value)) return false;

    const digits = value.split('')
    // store last 2 digits (10th and 11th) which are actually used for validation
    const d10 = Number(digits[9])
    const d11 = Number(digits[10])
    // we'll also need the sum of first 10 digits for validation
    let sumOf10 = 0
    let evens = 0
    let odds = 0

    digits.forEach((d, index) => {
        d = Number(d);
        if (index < 10) sumOf10 += d
        if (index < 9) {
            if ((index + 1) % 2 === 0) {
                evens += d
            } else {
                odds += d
            }
        }
    })
    // check if the unit-digit of the sum of first 10 digits equals to the 11th digit.
    if (sumOf10 % 10 !== d11) return false;

    // check if unit-digit of the sum of odds * 7 and evens * 9 is equal to 10th digit.
    if (((odds * 7) + (evens * 9)) % 10 !== d10) return false;

    // check if unit-digit of the sum of odds * 8 is equal to 11th digit.
    if ((odds * 8) % 10 !== d11) return false;

    return true;
}


export { hashToPassword, createToken, verifyToken, validate, mail, validateTcNumber, nanoid, logFile }