const mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
    name: {
        type: String
    },
    nodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Node"
        }
    ]
});

module.exports = mongoose.model("Blog", blogSchema);
