import Donate from "../models/donateModel.js"
import Photo from "../models/photoModel.js"
import { initializeCheckoutForm } from "./paymentService.js"


const donateService = async (data) => {
    const photo = await Photo.findById(data.photoId)
    data.body.user = photo.user
    data.body.photo = data.photoId
    const donate = await Donate.create(data.body)
    const pay = await initializeCheckoutForm(donate)
    console.log("sadasd", pay)
    return pay
}


export { donateService }