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
    res.render("register")
}
const loginPage = (req, res) => {
    console.log(res.locals.aut)
    res.render("login")
}
export { indexPage, aboutPage, contactPage, registerPage, loginPage }