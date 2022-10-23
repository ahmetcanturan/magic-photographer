import * as utils from "../utils/utils.js"
export default (req, res, next) => {
    try {
        if (!req.url.includes("/login")) {
            if (req?.cookies?.jwt) {
                const token = req.cookies.jwt
                const decodedToken = utils.verifyToken(token)
                if (decodedToken.decodedToken === null) {
                    res.locals.user = null
                    return res.status(404).send({
                        message: "Login expired please login again."
                    })
                }
            }
            else {
                res.locals.user = null
                return res.status(404).send({
                    message: "You need to login to see this page."
                })
            }
        }
        next()
    } catch (error) {
        console.log(error)
        res.locals.user = null
        return res.status(404).send({
            message: "You need to login to see this page."
        })
    }
}