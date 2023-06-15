const mongoose = require("mongoose");
const env = require("dotenv").config()
const connection = mongoose.connect("mongodb+srv://shubhangi:saini@cluster0.fatrmgn.mongodb.net/BlogApp?retryWrites=true&w=majority");

module.exports = {
    connection
}