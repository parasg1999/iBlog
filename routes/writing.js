var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');

// var ObjectId = require('mongodb').ObjectID;

var Node = require('../models/node');
var Blog = require('../models/blog');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// var jsonParser = bodyParser.json({ type: 'application/json'});

router.get("/", function(req, res) {
    res.render('index');
});

router.get("/postStory", function(req, res) {
    res.render('postStory');
});

// router.get("/makeMaps", function(req, res) {
//     var x = 3;
//     res.render('makeMapping', {x});
// });

router.get("/viewAllBlogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        var nodesArr = [];
        blogs.forEach((blog, index) => {
            Node.findOne({_id: blog.initialNode}).then(node => {
                    nodesArr[index] = node;
                    // console.log(JSON.stringify(node));
                    // console.log('Check' ,nodesArr);
            }).then(() => {
                if(index === (blogs.length - 1) ) {
                    for(var i = 0 ; ; i++) {        
                        if(typeof nodesArr[index].content !== 'undefined') {
                            setTimeout(() => {
                                res.render("writerAllBlogs", {blogs, nodesArr});
                            }, 2000);
                            break;
                        }
                    }
                }
            });
        });
    });

    // Blog.find({}).then((blogs) => {
    //     var nodesArr = [];
    //     blogs.forEach(blog => {
    //         // nodesArr = [];
    //         Node.findOne({_id: blog.initialNode}, function(err, node) {
    //             if(!err) {
    //                 nodesArr.push(node);
    //                 console.log(JSON.stringify(node));
    //                 console.log('Check' ,nodesArr);
    //             }
    //         });
    //     });
    // })
});

router.post("/post", function(req, res) {
    // console.log(JSON.stringify(req.body));

    var reqBlog = req.body.blog;
    var nodes = [];
    var newBlog = new Blog({
        name: reqBlog.name
    });

    var nodesArr = req.body.nodes;
    nodesArr.forEach(element => {
        var newNode = new Node({
            _id: new mongoose.mongo.ObjectId(),
            content: element.content,
            end: element.end,
        });

        newBlog.nodes.push(newNode._id);
        
        if(element.end === 'false') {
            newNode.question.content = element.question;
            
            element.options.forEach(option => {
                var optionObject = {};
                optionObject.key = option;
                newNode.question.options.push(optionObject);
            });
        }

        newBlog.initialNode = newBlog.nodes[0];

        nodes.push(newNode);
        newNode.save();
    });

    newBlog.save().then((result) => {
        res.send(200);
    }).catch((err) => { });

});



router.post("/edit/:id", function(req, res) {
    // console.log(req.body);
    Node.findOne({_id: req.body.nodeId})
    .then((node) => {
        var x = 0;
        // console.log(JSON.stringify(gotNode, undefined, 4));
        node.question.options.forEach((option, index) => {
            // gotNode.question.options[index].mapping = req.body.mappings[index].mapping;
            console.log(req.body);
            node.question.options[index].mapping = req.body.mappings[index].mapping;
            if((req.body.mappings.length - 1) === index) {
                Node.findOneAndUpdate({_id: req.body.nodeId} , node , function (err, result) {
                    if(!err) {
                        setTimeout(() => {
                            res.redirect("/writing/viewAllBlogs");
                        }, 2000);
                    }
                });
            }
        });

    });
});

router.get("/edit/:id", function(req, res) {
    var nodesArr = [];
    // console.log(req.params.id);
    Blog.findOne({_id: req.params.id}).then((blog) => {
        blog.nodes.forEach((blogNode, index) => {
            // console.log(blogNode);
            Node.findOne({_id: blogNode}).then(node => {
                nodesArr[index] = node;
            }).then(() => {
                if(index === (blog.nodes.length - 1) ) {
                    for(var i = 0 ; ; i++) {        
                        if(typeof nodesArr[index]._id !== 'undefined') {
                            setTimeout(() => {
                                res.render("makeMapping", {blog, nodesArr});
                            }, 2000);
                            
                            break;
                        }
                    }
                }
            });
        });
    });
});

module.exports = router;