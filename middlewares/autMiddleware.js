import * as utils from "../utils/utils.js"

export default (req, res, next) => {
    try {
        if (!req.url.includes("/login")) {
            if (req?.cookies?.jwt) {
                const token = req.cookies.jwt
                const decodedToken = utils.verifyToken(token)
                if (decodedToken.decodedToken === null) {
                    return res.status(404).redirect("/login")
                }
            }
            else {
                return res.status(404).redirect("/login")
            }
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).redirect("/login")
    }
}