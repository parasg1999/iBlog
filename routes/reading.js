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

router.get("/", function(req, res) {

    var newBlog = new Blog({
        name: 'Hello',
        initialNode: ObjectId()
    });

    newBlog.save();

    Blog.find({}, function(err, blogs) {

        // blog = blog.toObject();
        if (!err) {
            var arr = [];
            for (var i = 0; i < blogs.length; i++) {
                var blog = blogs[i];
                var st = {};
                st.id = blog._id;
                st.name = blog.name;
                /* st.content = blog.substring(0, 100); */
                arr.push(st);
            }

            /* console.log(st); */
            res.render('test', { blogs: arr });
        }
    });

});
// router.get("/404", function (req, res) {
//     res.render("404");
// });

module.exports = router;