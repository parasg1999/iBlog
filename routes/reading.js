var express = require("express");
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Blog = require("../models/blog.js");
var Node = require("../models/node.js");


// router.get("/read/:id", function(req, res) {
//     Blog.findOne({ _id: ObjectId(req.params.id) }, function(err, blog) {
//         if (!err) {
//             blog.name
//         }

//     });
// })

router.get('/read/:id', function(req, res) {
    var nodesArr = [];
    Blog.findOne({_id: req.params.id}).then((blog) => {
        blog.nodes.forEach((blogNode, index) => {
            Node.findOne({_id: blogNode}).then(node => {
                nodesArr[index] = node;
            }).then(() => {
                if(index === (blog.nodes.length - 1)) {
                    for(var i = 0 ; ; i++) {        
                        if(typeof nodesArr[index]._id !== 'undefined') {
                            setTimeout(() => {
                                res.render("readStory", {blog, nodesArr});
                            }, 2000);
                            break;
                        }
                    }
                }
            });
        });
    });
}); 

router.get("/", function(req, res) {

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
                                res.render("showAllBlogs", {blogs, nodesArr});
                            }, 2000);
                            
                            break;
                        }
                    }
                }
            });
        });
    });

    // Blog.find({})
    // .then((blogs) => {
    //     var arr = [];
    //     blogs.forEach((blog, index) => {
    //         // console.log(blog);
    //         var b = {};
    //         b.id = blog._id;
    //         b.name = blog.name;
    //         Node.findOne({_id: blog.initialNode})
    //         .then((node) => {
    //             // console.log(index, node);
    //             b.content = node.content;
    //             arr[index] = b;
    //             if(index === blogs.length - 1) {
    //                 // for(var x = 0 ; ; x++) {
    //                     if(typeof arr[index].content !== 'undefined') {
    //                         // console.log(b, "sd");
    //                         console.log(arr);
    //                         res.render("showAllBlogs", {blog: arr});
    //                     }
    //                 // }
    //             }
    //         });
    //     });
    // });

        // if (!err) {
        //     var arr = [];
        //     for (var i = 0; i < blogs.length; i++) {
        //         var blog = blogs[i];
        //         var st = {};
        //         st.id = blog._id;
        //         st.name = blog.name;
        //         /* st.content = blog.substring(0, 100); */
        //         arr.push(st);
        //     }

});
// router.get("/404", function (req, res) {
//     res.render("404");
// });

router.get("/load/:id", function(req, res) {
    Node.findOne({_id: req.params.id})
    .then((node) => {
        res.send(node);
    })
})

module.exports = router;