import * as services from "../services/index.js"
import fs from "fs"
const createPhoto = async (req, res) => {
    try {
        const json = await services.photo.createPhoto(req, res)
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

const getPhotosOfAUser = async (req, res) => {
    try {
        const photos = await services.photo.getPhotosOfAUser(req.params.userId)
        console.log(photos)
        res.status(201).render("photosOfUser", { photos })
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}

const deletePhoto = async (req, res) => {
    try {
        console.log("geldi")
        await services.photo.deletePhoto(req)
        res.status(200).redirect("/user/aut/control-board")
    } catch (error) {
        console.log(error)
        res.status(500).json({ succeded: false, error })
    }
}

export { createPhoto, getAllPhotos, getPhotoById, getPhotosOfAUser, deletePhoto }