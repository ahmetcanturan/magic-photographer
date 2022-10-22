import express from "express"
import * as photoController from "../controllers/photoController.js"

const router = express.Router()

router.get("/photos", photoController.getAllPhotos)
router.get("/photos/:photoId", photoController.getPhotoById)
router.post("/photoupload", photoController.createPhoto)
export default router