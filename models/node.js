const mongoose = require('mongoose');

var nodeSchema = mongoose.Schema({
    content: {
        type: String
    },
    end: {
        type: Boolean
    },
    images: [
        {
            value: {
                type: Number
            }, 
            link: {
                type: String
            }
        }
    ],
    question: {
        content: {
            type: String
        },
        options: [
            {
                key: {
                    type: String
                },
                mapping: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Node"
                }
            }
        ]
    }
});

module.exports = mongoose.model("Node", nodeSchema);
