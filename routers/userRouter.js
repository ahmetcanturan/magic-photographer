import express from "express"
import * as controllers from "../controllers/index.js"

const router = express.Router()

router.post("/register", controllers.user.createUser)
router.post("/login", controllers.user.login)
router.get("/control-board", controllers.user.controlBoard)
router.get("/logout", controllers.user.logOut)
export default router