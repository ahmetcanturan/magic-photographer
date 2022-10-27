import * as services from "../services/index.js"
import { validate } from "../utils/utils.js"
import Photo from "../models/photoModel.js"

const createUser = async (req, res) => {
    try {
        if (validate(req, res, "register") != null) { return }
        const json = await services.user.createUser(req.body)
        res.status(201).redirect("/")
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}

const login = async (req, res) => {
    try {
        if (validate(req, res, "login") != null) { return }
        const json = await services.user.login(req)
        return (json.status == true) ? res.cookie("jwt", json.token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }).redirect("/user/aut/control-board") : res.status(500).json({ json })
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}

const controlBoard = async (req, res) => {
    try {
        const photos = await Photo.find({ user: res.locals.user.id })
        return res.status(201).render("controlBoard", { photos })
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}
const logOut = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(201).redirect("/")
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}
const yourPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.photoId)
        return (photo.user == res.locals.user.id) ? res.status(200).render("yourPhoto", { photo }) : res.status(400).redirect("/photos")

    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}





export { createUser, login, controlBoard, logOut, yourPhoto }