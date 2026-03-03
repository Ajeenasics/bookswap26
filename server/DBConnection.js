require('dotenv').config()
const mongoose = require("mongoose")
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bookswapdb"
mongoose.connect(uri)
var db = mongoose.connection
db.on("error", console.error.bind("error"))
db.once("open", function () {
    console.log("connection successful")
})

module.exports = db