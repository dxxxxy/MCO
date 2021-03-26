const express = require("express")
const app = express()
const path = require("path")

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/login")
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/login.html"))
})

app.listen(80, () => {
    console.log("Listening on port 80")
})

/*

static server : http: 80  https: 443

// server url : myapp.heroku.app 
dreamysoft.net/mco

// CNAME DNS : myapp.heroku.app 


*/