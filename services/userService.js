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

const login = async (data) => {
    const user = await User.findOne({ username: data.username })
    if (!user) { return { status: false, message: "An incorrect username" } }
    const compare = (user.password == utils.hashToPassword(data.password)) ? { status: true } : { status: false, message: "An incorrect password" }
    return compare
}


export { createUser, login }