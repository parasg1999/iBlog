var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({extended: true}));
// router.use(bodyParser.json());

var jsonParser = bodyParser.json({ type: 'application/*+json'});

router.get("/", function(req, res) {
    res.render('index');
});

router.get("/postStory", function(req, res) {
    res.render('postStory');
});

router.post("/post", jsonParser, function(req, res) {
    console.log("sfsf" ,req);
});

router.get("/postStory", function(req, res) {
    var newBlog = new Blog({

    })
});

// router.get("/404", function (req, res) {
//     res.render("404");
// });

module.exports = router;