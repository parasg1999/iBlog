var express = require('express'),
    ejs = require('ejs'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");

//requiring routes
var indexRoutes = require("./routes/index");
var teamRoutes = require("./routes/team");
var adminRoutes = require("./routes/admin");
var studentRoutes = require("./routes/student");
var url = "mongodb://localhost:27017/int_blog";
mongoose.connect(url, {
    useNewUrlParser: true
}, function(err, db) {
    if(!err) {
        console.log("Connected to MongoDB");
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use("/", indexRoutes);
app.use(function(req, res, next) {
    res.status(404).render('404', { title: "sorry Page not found" });
});

console.log(process.env.PORT);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Port up and running");
});