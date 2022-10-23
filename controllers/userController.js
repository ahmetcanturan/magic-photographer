import * as services from "../services/index.js"

const createUser = async (req, res) => {
    try {
        const json = await services.user.createUser(req.body)
        res.status(201).json({ json })
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}

const login = async (req, res) => {
    try {
        const json = await services.user.login(req)
        return (json.status == true) ? res.cookie("jwt", json.token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }).redirect("/photos") : res.status(500).json({ json })
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}




export { createUser, login }