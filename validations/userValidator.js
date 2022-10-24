import { body, query, param } from 'express-validator'
import User from "../models/userModel.js"
import { hashToPassword } from '../utils/utils.js'
const userValidator = {
    validateCreateUser() {
        return [
            body('username')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write an username")
                .isLength({ min: 3, max: 20 }).withMessage("Username must include 3-20 characters")
                .custom(async (value, { req }) => {
                    const result = await User.findOne({ username: value })
                    if (result) throw new Error('This username is already in use')
                    return true
                }),
            body('email').isEmail().withMessage("Invalid email.")
                .custom(async (value, { req }) => {
                    const result = await User.findOne({ email: value })
                    if (result) throw new Error('This email is already in use')
                    return true
                }),
            body('password')
                .notEmpty({ ignore_whitespace: true }).withMessage("You must write a password")
                .isLength({ min: 8, max: 30 }).withMessage("Password must include 8-20 characters"),
        ]
    },
    validateLoginUser() {
        return [
            body('username')
                .custom(async (value, { req }) => {
                    const result = await User.findOne({ username: value })
                    const pass = req?.body?.password
                    if (!result) throw new Error("You entered a wrong username")
                    else if (pass == undefined) throw new Error("You didn't enter a password")
                    else if (hashToPassword(pass) != result.password) throw new Error("You entered wrong a password")
                    return true
                })
        ]
    }

}

export default userValidator