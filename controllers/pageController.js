import { mail as mailler } from "../utils/utils.js"
const indexPage = (req, res) => {
  res.render("index")
}
const aboutPage = (req, res) => {
  res.render("about")
}
const contactPage = (req, res) => {
  res.render("contact")
}
const registerPage = (req, res) => {
  res.locals.error = null
  res.render("register")
}
const loginPage = (req, res) => {
  res.locals.error = null
  res.render("login")
}
const donatePage = (req, res) => {

  res.locals.error = null
  res.send("register")
}
const mail = async (req, res) => {
  try {
    await mailler(req)
    res.status(200).redirect("/")
  } catch (error) {
    console.log(error)
    res.status(500).json({ succeeded: false, error })
  }
}

export { indexPage, aboutPage, contactPage, registerPage, loginPage, mail }