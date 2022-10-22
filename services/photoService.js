import Photo from "../models/photoModel.js"


const createPhoto = async (data) => {
    const photo = await Photo.create(data)
    return photo
}


const getAllPhotos = async () => {
    const photo = await Photo.find()
    return photo
}

const getPhotoById = async (id) => {
    const photo = await Photo.findById(id)
    return photo
}

export { createPhoto, getAllPhotos, getPhotoById }