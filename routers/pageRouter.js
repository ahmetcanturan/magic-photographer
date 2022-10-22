import express from "express"
import * as pageController from "../controllers/pageController.js"

const router = express.Router()

router.get("/", pageController.indexPage)
router.get("/about", pageController.aboutPage)
router.get("/contact", pageController.contactPage)
router.get("/register", pageController.registerPage)
router.get("/login", pageController.loginPage)
export default router