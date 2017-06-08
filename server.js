const port = process.env.PORT || 3000
const ip = process.env.IP || '127.0.0.1'

const express = require("express")
const hbs = require("hbs")
const fs = require("fs")

var app = express()

hbs.registerPartials(__dirname + "/views/partials")
app.set("view engine", "hbs")

app.use(express.static(__dirname + "/public"))

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} - ${req.url}`
    console.log(log)
    fs.appendFile('system.log', log + "\n", (err) => {
        if (err) {
            console.log(`Error: ${err}`)
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
        pageContent: "Welcome to this page"
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page",
        currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({
        status: "failure",
        date: new Date(),
        message: 'Error accessing route'
    })
})

app.listen(port, () => {
    console.log('Running on', ip, port)
})
