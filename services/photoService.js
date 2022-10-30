import Photo from "../models/photoModel.js"
import { v2 as cloudinary } from "cloudinary"
const createPhoto = async (req, res) => {
    const img = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        width: 400, crop: "pad",
        use_filename: true,
        folder: "magic_photographer"
    })
    const body = req.body
    body.image = img.secure_url
    body.user = res.locals.user.id
    body.cloudinaryId = img.public_id
    const photo = await Photo.create(body)
    return photo
}


const getAllPhotos = async () => {
    const photo = await Photo.find()
    return photo
}

const getPhotoById = async (id) => {
    const photo = await Photo.findById(id).populate("user")
    return photo
}
const getPhotosOfAUser = async (id) => {
    const photos = await Photo.find({ user: id }).populate("user")
    return photos
}
const deletePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.photoId)
    const cloudinaryId = photo.cloudinaryId
    await cloudinary.uploader.destroy(cloudinaryId)
    await Photo.findByIdAndDelete(photo.id)
    return
}
const download = async (photoId) => {
    const photo = await Photo.findById(photoId)
    const download = await cloudinary.url(photo.cloudinaryId, { flags: "attachment:ahmtcntrnAPI" })
    return download
}

export { createPhoto, getAllPhotos, getPhotoById, getPhotosOfAUser, deletePhoto, download }