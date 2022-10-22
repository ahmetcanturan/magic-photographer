import express from "express"
import * as controllers from "../controllers/index.js"

const router = express.Router()

router.post("/register", controllers.user.createUser)
export default router