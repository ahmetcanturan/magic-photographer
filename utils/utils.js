import md5 from "md5"
import jwt from "jsonwebtoken"


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

export { hashToPassword, createToken, verifyToken }