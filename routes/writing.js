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

router.get("/makeMaps", function(req, res) {
    var x = 3;
    res.render('makeMapping', {x});
});

router.get("/viewAllBlogs", function(req, res) {
    var blogs;
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
                            res.render("writerAllBlogs", {blogs, nodesArr});
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

router.get("/postStory", function(req, res) {
    var newBlog = new Blog({

    })
});

router.get("/edit/:id", function(req, res) {
    var nodesArr = [];
    // console.log(req.params.id);
    Blog.findOne({_id: req.params.id}).then((blog) => {
        blog.nodes.forEach((blogNode, index) => {
            // console.log(blogNode);
            Node.findOne({_id: blogNode}).then(node => {
                nodesArr.push(node);
            }).then(() => {
                if(index === (blog.nodes.length - 1) ) {
                    for(var i = 0 ; ; i++) {        
                        // if(typeof nodesArr[index].content !== 'undefined') {
                            console.log("HELLo");
                            res.render("test", {nodesArr});
                            break;
                        // }
                    }
                }
            });
        });
    });
});

module.exports = router;