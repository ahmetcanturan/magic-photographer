import express from "express"
import * as pageController from "../controllers/pageController.js"
import donateValid from "../validations/donateValidator.js"
const router = express.Router()

router.get("/", pageController.indexPage)
router.get("/contact", pageController.contactPage)
router.post("/contact", pageController.mail)
router.get("/register", pageController.registerPage)
router.get("/login", pageController.loginPage)
router.get("/donate/:photoId", pageController.donatePage)
router.post("/donate/:photoId", [donateValid.donateValid()], pageController.donatePost)
export default router