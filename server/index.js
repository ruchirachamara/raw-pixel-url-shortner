const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const mongoURI = "mongodb+srv://root:root@cluster0-vjkjo.mongodb.net/URLShortner?retryWrites=true&w=majority"
const connectOptions = { 
    keepAlive: true, 
    reconnectTries: Number.MAX_VALUE 
}
const PORT = 7000

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, connectOptions, (err, db) => 
{ 
    if (err) console.log(`Error`, err)
    else console.log(`Connected to MongoDB`)
})

require('./src/models/UrlShorten')

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key')
    if (req.method == 'OPTIONS') {
        res.status(200).end()
    } else {
        next()
    }
})

require('./src/routes/urlshorten')(app)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})