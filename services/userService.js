import User from "../models/userModel.js"
import * as utils from "../utils/utils.js"

const createUser = async (data) => {
    const password = utils.hashToPassword(data.password)
    delete data.password
    data.password = password
    const user = await User.create(data)
    console.log(user)
    return user
}

const login = async (req) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) { return { status: false, message: "An incorrect username" } }
    const compare = (user.password == utils.hashToPassword(req.body.password)) ? { status: true } : { status: false, message: "An incorrect password" }
    if (compare.status == true) {
        const token = utils.createToken(user.id, user.username, user.email)
        // req.headers.authorization = token
        compare.token = token
    }
    return compare
}


export { createUser, login }