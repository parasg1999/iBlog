var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');

var Node = require('../models/node');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// var jsonParser = bodyParser.json({ type: 'application/json'});

router.get("/", function(req, res) {
    res.render('index');
});

router.get("/postStory", function(req, res) {
    res.render('postStory');
});

router.post("/post", function(req, res) {
    // console.log(JSON.stringify(req.body));

    var nodesArr = req.body.nodes;
    nodesArr.forEach(element => {
        var newNode = new Node({
            content: element.content,
            end: element.end,
        });
        
        if(element.end === 'false') {
            newNode.question.content = element.question;
            
            element.options.forEach(option => {
                var optionObject = {};
                optionObject.key = option;
                newNode.question.options.push(optionObject);
            });
        }
        

        newNode.save();
    });

});

router.get("/postStory", function(req, res) {
    var newBlog = new Blog({

    })
});

// router.get("/404", function (req, res) {
//     res.render("404");
// });

module.exports = router;