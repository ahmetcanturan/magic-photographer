import User from "../models/userModel.js"


const createUser = async (data) => {
    const user = await User.create(data)
    console.log(user)
    return user
}

const getAllPhotos = async () => {
    const photo = await Photo.find()
    return photo
}

const getPhotoById = async (id) => {
    const photo = await Photo.findById(id)
    return photo
}

export { createUser }