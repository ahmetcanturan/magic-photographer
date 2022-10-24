import express from "express"
import * as controllers from "../controllers/index.js"
import userValidator from "../validations/userValidator.js"
import { userDetect } from "../middlewares/index.js"

const router = express.Router()

router.post("/register", [userValidator.validateCreateUser()], controllers.user.createUser)
router.post("/login", [userValidator.validateLoginUser()], controllers.user.login)
router.get("/aut/control-board", [userDetect], controllers.user.controlBoard)
router.get("/logout", controllers.user.logOut)
export default router