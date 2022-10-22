import * as services from "../services/index.js"

const createPhoto = async (req, res) => {
    try {
        const json = await services.photo.createPhoto(req.body)
        res.status(201).json({ json })
    } catch (error) {
        res.status(500).json({ succeded: false, error })
    }
}

const getAllPhotos = async (req, res) => {
    try {
        const photos = await services.photo.getAllPhotos()
        res.status(201).render("photos", { photos })
    } catch (error) {
        res.status(500).json({ succeded: false, error })
    }
}

const getPhotoById = async (req, res) => {
    try {
        const photo = await services.photo.getPhotoById(req.params.photoId)
        res.status(201).render("photo", { photo })
    } catch (error) {
        res.status(500).json({ succeded: false, error })
    }
}

export { createPhoto, getAllPhotos, getPhotoById }