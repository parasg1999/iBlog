const mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
    name: {
        type: String
    },
    initialNode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Node"
    },
    author: {
        type: String
    }, 
    rating: {
        type: Number
    },
    nodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Node"
        }
    ]
});

module.exports = mongoose.model("Blog", blogSchema);
