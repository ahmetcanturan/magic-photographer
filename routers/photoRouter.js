import express from "express"
import * as photoController from "../controllers/photoController.js"
import { userDetect } from "../middlewares/index.js"

const router = express.Router()

router.get("/photos", photoController.getAllPhotos)
router.get("/photos/:photoId", photoController.getPhotoById)
router.post("/user/aut/createPhoto", [userDetect], photoController.createPhoto)
export default router