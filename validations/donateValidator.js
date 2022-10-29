import { body, query, param } from 'express-validator'
import { validateTcNumber } from "../utils/utils.js"
import Photo from "../models/photoModel.js"
const donateValidator = {
    donateValid() {
        return [
            body('name')
                .isLength({ min: 2, max: 35 }).withMessage("Name must include 2-35 characters"),
            body('surname')
                .isLength({ min: 2, max: 35 }).withMessage("Surname must include 2-35 characters"),
            body('email').isEmail().withMessage("Invalid email"),
            body('tc')
                .custom(async (value, { req }) => {
                    if (validateTcNumber(value) === false) {
                        throw new Error('Invalid TC Number')
                    }
                    return true
                }),
            body('tel')
                .custom(async (value, { req }) => {
                    var pattern = /^(5)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/
                    if (!String(value).match(pattern)) { throw new Error("Phone number must be like this: 5xxxxxxxxx") }
                    return true
                }),
            body("amount")
                .custom(async (value, { req }) => {
                    var pattern = value.includes(",")
                    if (pattern) { throw new Error("use dot instead of comma") }
                    return true
                }),
            param("photoId")
                .isMongoId().withMessage("Invalid Id")
                .custom(async (value, { req }) => {
                    const result = await Photo.findById(value)
                    if (!result) {
                        throw new Error('Invalid Id', value)
                    }
                    return true
                }),

        ]
    }
}

export default donateValidator