import * as utils from "../utils/utils.js"
import User from "../models/userModel.js"

export default async (req, res, next) => {
    try {
        const url = req.url
        if (url.includes("/user/") & (!url.includes("login")) & (!url.includes("register"))) {
            const token = req.cookies.jwt
            const decodedToken = utils.verifyToken(token)
            const detectedUser = await User.findById(decodedToken.decodedToken.userId)
            res.locals.user = detectedUser
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).redirect("/login")
    }
}