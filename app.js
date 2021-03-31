const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const sessions = require("express-session")
const { response } = require("express")

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
        res.redirect("/redirects")
    }
    res.sendFile(path.join(__dirname, "/public/login/login.html"))
})

app.post("/login", (req, res) => {
    //res.end(JSON.stringify(req.body))
    session = req.session
    if (session.uniqueID) {
        res.redirect("/redirects")
    }
    if (req.body.username == "admin" || req.body.password == "admin") { //Implement MongoDB
        session.uniqueID = req.body.username
    }
    res.redirect("/redirects")
})

app.get("/redirects", (req, res) => {
    session = req.session
    if (session.uniqueID) {
        console.log(session.uniqueID)
        res.redirect("/dashboard")
    } else {
        res.end("Who are you??")
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.send("logged out")
})

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/dashboard/dashboard.html"))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})