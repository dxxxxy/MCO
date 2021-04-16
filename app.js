const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const sessions = require("express-session")

var session
var port = process.env.PORT || 80

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));

app.use(sessions({
    secret: "asda89-7129-37123123$%!#$1354135",
    resave: false,
    saveUninitialized: true
}))

app.get("/", (req, res) => {
    res.redirect("/login")
})

app.get("/login", (req, res) => {
    session = req.session
    if (session.uniqueID) {
        res.redirect("/redirects") //If logged in, redirect to /redirects
    }
    res.sendFile(path.join(__dirname, "/public/login/login.html"))
})

app.get("/account", (req, res) => {
    session = req.session
    if (!session.uniqueID) {
        res.redirect("/redirects") //If logged in, redirect to /redirects
    } else res.sendFile(path.join(__dirname, "/public/account/account.html"))
})

app.post("/login", (req, res) => {
    session = req.session
        /*if (session.uniqueID) {
            res.redirect("/redirects")
        }*/
    if (req.body.username == "admin" || req.body.password == "admin") { //Implement MongoDB
        session.uniqueID = req.body.username
    }
    res.redirect("/redirects")
})

app.get("/redirects", (req, res) => {
    session = req.session
    if (session.uniqueID) {
        res.redirect("/dashboard") //If logged in, redirects to /dashboard
    } else {
        res.redirect("/login") //If not logged in, redirects to /login
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login") //If logged out, redirects to /login
})

app.get("/dashboard", (req, res) => {
    if (!session.uniqueID) {
        res.redirect("/redirects") //If logged in, redirect to /redirects
    } else res.sendFile(path.join(__dirname, "/public/dashboard/dashboard.html"))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})