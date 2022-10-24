import * as utils from "../utils/utils.js"

export default (req, res, next) => {
    try {
        if (req?.cookies?.jwt) {
            const token = req.cookies.jwt
            const decodedToken = utils.verifyToken(token)
            if (decodedToken.decodedToken === null) {
                res.locals.aut = false
            }
            else {
                res.locals.aut = true
            }
        }
        else res.locals.aut = false
        next()
    } catch (error) {
        console.log(error)
        res.locals.aut = false
        return res.status(404).redirect("/login")
    }
}