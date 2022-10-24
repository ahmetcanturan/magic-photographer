//! npm i express ejs dotenv mongoose md5 jsonwebtoken cookie-parser express-validator
// mongodb + srv://admin:<password>@ahmtcntrn.0zlhurr.mongodb.net/?retryWrites=true&w=majority
import express from "express"
import dotenv from "dotenv"
import dbConnect from "./db/db.js"
import * as routers from "./routers/index.js"
import * as middlewares from "./middlewares/index.js"
import cookie from "cookie-parser"

dotenv.config()
const app = express()
const router = express.Router()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))//?Formdan gelen verileri alabilmek için
app.use(cookie())
app.use(middlewares.aut)

//? -------------App.use_Routers---------------
app.use(`${process.env.APP_PREFIX}`, routers.page)//?->localhost:3000/MagicPhotographer/
app.use(`${process.env.APP_PREFIX}`, routers.photo)//?
app.use(`${process.env.APP_PREFIX}/user`, routers.user)//?->localhost:3000/MagicPhotographer/user/
//* -------------App.use_Routers-END-----------


app.use(router)
app.listen(process.env.PORT, () => console.log(`${process.env.PORT}. is Activated..`))
dbConnect()