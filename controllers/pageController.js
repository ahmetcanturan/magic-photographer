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
const mail = async (req, res) => {
  try {
    await mailler(req)
    res.status(200).json({ succeeded: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ succeded: false, error })
  }
}
export { indexPage, aboutPage, contactPage, registerPage, loginPage, mail }