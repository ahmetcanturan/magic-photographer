import * as services from "../services/index.js"

const createUser = async (req, res) => {
    try {
        const json = await services.user.createUser(req.body)
        res.status(201).json({ json })
    } catch (error) {
        res.status(500).json({ succeded: false, error })
    }
}



export { createUser }