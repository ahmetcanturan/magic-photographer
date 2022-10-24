import md5 from "md5"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import * as controllers from "../controllers/index.js"

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


export { hashToPassword, createToken, verifyToken, validate }