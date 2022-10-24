import * as services from "../services/index.js"
import fs from "fs"
import { v2 as cloudinary } from "cloudinary"
const createPhoto = async (req, res) => {
    try {
        const img = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            use_filename: true,
            folder: "magic_photographer"
        })
        const body = req.body
        body.image = img.secure_url
        body.user = res.locals.user.id
        const json = await services.photo.createPhoto(body)
        fs.unlinkSync(req.files.image.tempFilePath)
        res.status(201).redirect("/user/aut/control-board")
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}

const getAllPhotos = async (req, res) => {
    try {
        const photos = await services.photo.getAllPhotos()
        res.status(201).render("photos", { photos })
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}

const getPhotoById = async (req, res) => {
    try {
        const photo = await services.photo.getPhotoById(req.params.photoId)
        res.status(201).render("photo", { photo })
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}

export { createPhoto, getAllPhotos, getPhotoById }